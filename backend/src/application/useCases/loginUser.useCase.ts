import { injectable, inject } from 'inversify';
import { TYPES } from '../../core/types';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository';
import { ILoginUserUseCase } from '../../domain/interfaces/useCases/loginUser.interface';
import { IJwtService } from '../../domain/interfaces/services/IJwtService';
import { AuthResponseDTO, LoginDTO } from '../dtos/auth.dto';
import { CustomError } from '../../utils/errors/custom.error';
import { ErrorMsg } from '../../utils/constants/commonErrorMsg.constants';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import { comparePassword } from '../../utils/helpers/passwordCompare.util';

/**
 * Handles the user login process.
 * Validates credentials and issues JWT tokens with role-based access control.
 */
@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
  /**
   * Initializes the LoginUserUseCase with injected dependencies.
   *
   * @param {IUserRepository} _userRepository - Repository for user data retrieval.
   * @param {IJwtService} _jwtService - Service for JWT token generation.
   */
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.JwtService) private _jwtService: IJwtService,
  ) {}

  /**
   * Executes the login process.
   * Validates user credentials and generates authentication tokens.
   *
   * @param {LoginDTO} dto - Data Transfer Object containing email and password.
   * @returns {Promise<AuthResponseDTO>} Returns access and refresh tokens along with user details.
   * @throws {CustomError} If user is not found, password mismatch, or auth provider mismatch.
   */
  async execute(dto: LoginDTO): Promise<AuthResponseDTO> {
    const user = await this._userRepository.findByEmail(dto.email);

    if (!user || !user._id) {
      throw new CustomError(ErrorMsg.USER_NOT_FOUND, HttpResCode.UNAUTHORIZED);
    }

    if (!user.password) {
      throw new CustomError(ErrorMsg.LOGIN_WITH_SOCIAL_ACCOUNT, HttpResCode.BAD_REQUEST);
    }

    const isMatch = await comparePassword(dto.password, user.password);

    if (!isMatch) {
      throw new CustomError(ErrorMsg.PASSWORD_MISMATCH, HttpResCode.UNAUTHORIZED);
    }

    if (!user.isVerified) {
      throw new CustomError(ErrorMsg.USER_NOT_VERIFIED, HttpResCode.UNAUTHORIZED);
    }

    const userId = user._id.toString();
    const accessToken = this._jwtService.generateAccessToken(userId, user.role);
    const refreshToken = this._jwtService.generateRefreshToken(userId, user.role);

    return new AuthResponseDTO(accessToken, refreshToken, {
      id: userId,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }
}
