import { injectable, inject } from 'inversify';
import { IVerifyOtpUseCase } from '../../domain/interfaces/useCases/verifyOtpUser.interface';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository';
import { IJwtService } from '../../domain/interfaces/services/IJwtService';
import { IOtpService } from '../../domain/interfaces/services/IOtpService';
import { TYPES } from '../../core/types';
import { AuthResponseDTO, VerifyOtpDTO } from '../dtos/auth.dto';
import { ErrorMsg } from '../../utils/constants/commonErrorMsg.constants';
import { CustomError } from '../../utils/errors/custom.error';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import { hashPassword } from '../../utils/helpers/passwordHash.util';

/**
 * Use case for finalizing user registration.
 * Verifies the OTP, creates the user record, and issues authentication tokens.
 */
@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  /**
   * Initializes dependencies.
   * @param {IUserRepository} _userRepository - Repository for persistence.
   * @param {IJwtService} _jwtService - Service for token generation.
   * @param {OtpService} _otpService - Service for OTP validation.
   */
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.JwtService) private _jwtService: IJwtService,
    @inject(TYPES.OtpService) private _otpService: IOtpService,
  ) {}

  /**
   * Executes the verification and creation logic.
   * * @param {VerifyOtpDTO} dto - Data transfer object containing user details and OTP.
   * @returns {Promise<AuthResponseDTO>} The tokens and user info.
   * @throws {CustomError} If OTP is invalid or user creation fails.
   */
  async execute(dto: VerifyOtpDTO): Promise<AuthResponseDTO> {
    const isValid = await this._otpService.verifyOtp(dto.email, dto.otp);

    if (!isValid) {
      throw new CustomError(ErrorMsg.INVALID_OTP, HttpResCode.BAD_REQUEST);
    }

    const existingUser = await this._userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new CustomError(ErrorMsg.USER_ALREADY_EXISTS, HttpResCode.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(dto.password);

    const newUser = await this._userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: 'student',
      isVerified: true,
      authProvider: 'local',
    });

    if (!newUser || !newUser._id) {
      throw new CustomError(ErrorMsg.USER_NOT_FOUND, HttpResCode.INTERNAL_SERVER_ERROR);
    }

    const userId = newUser._id.toString();
    const role = newUser.role;

    const accessToken = this._jwtService.generateAccessToken(userId, role);
    const refreshToken = this._jwtService.generateRefreshToken(userId, role);

    return new AuthResponseDTO(accessToken, refreshToken, {
      id: userId,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });
  }
}
