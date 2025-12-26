import { injectable, inject } from 'inversify';
import { ISendOtpUseCase } from '../../domain/interfaces/useCases/sentOtpUser.interface';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository';
import { OtpService } from '../../infrastructure/services/otp.service';
import { TYPES } from '../../core/types';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import { ErrorMsg } from '../../utils/constants/commonErrorMsg.constants';
import { CustomError } from '../../utils/errors/custom.error';
import { IOtpService } from '../../domain/interfaces/services/IOtpService';

/**
 * Use case for initiating the registration process.
 * Handles the business logic of checking user existence before triggering the OTP flow.
 */
@injectable()
export class SendOtpUseCase implements ISendOtpUseCase {
  /**
   * Initializes the SendOtpUseCase with necessary dependencies.
   * @param {IUserRepository} _userRepository - Access to User data.
   * @param {OtpService} _otpService - Facade service for handling OTP generation, storage, and emailing.
   */
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.OtpService) private _otpService: IOtpService,
  ) {}

  /**
   * Executes the OTP sending process.
   * * @param {string} email - The email address to register.
   * @returns {Promise<void>} Resolves if successful.
   * @throws {CustomError} If the user already exists.
   */
  async execute(email: string): Promise<void> {
    const existingUser = await this._userRepository.findByEmail(email);
    if (existingUser) {
      throw new CustomError(ErrorMsg.USER_ALREADY_EXISTS, HttpResCode.BAD_REQUEST);
    }

    await this._otpService.sendOtp(email);

    console.log(`SendOtpUseCase: Flow completed for ${email}`);
  }
}
