import { injectable, inject } from 'inversify';
import { IGoogleLoginUseCase } from '../../domain/interfaces/useCases/socialLogin.interface';
import { TYPES } from '../../core/types';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository';
import { IGoogleAuthService } from '../../domain/interfaces/services/ISocialLogin';
import { IJwtService } from '../../domain/interfaces/services/IJwtService';
import { AuthResponseDTO, SocialLoginDTO } from '../dtos/auth.dto';
import { ErrorMsg } from '../../utils/constants/commonErrorMsg.constants';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import { CustomError } from '../../utils/errors/custom.error';

/**
 * Handles authentication via Google.
 * Exchanges auth code for profile, finds/creates user, and issues tokens.
 */
@injectable()
export class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.GoogleAuthService) private _googleAuthService: IGoogleAuthService,
    @inject(TYPES.JwtService) private _jwtService: IJwtService,
  ) {}

  /**
   * Executes the Google login logic.
   * @param dto - DTO containing the Google authorization code.
   * @returns Promise resolving to the authentication response.
   */
  async execute(dto: SocialLoginDTO): Promise<AuthResponseDTO> {
    const socialProfile = await this._googleAuthService.getUserProfile(dto.code);

    let user = await this._userRepository.findByEmail(socialProfile.email);

    if (!user) {
      user = await this._userRepository.create({
        name: socialProfile.name,
        email: socialProfile.email,
        authProvider: 'google',
        providerId: socialProfile.providerId,
        avatar: socialProfile.avatar,
        role: 'student',
        isVerified: true,
      });
    } else {
      if (!user.providerId || user.authProvider !== 'google') {
        await this._userRepository.update(user._id.toString(), {
          providerId: socialProfile.providerId,
          authProvider: 'google',
        });
      }
    }

    if (!user || !user._id) {
      throw new CustomError(ErrorMsg.INTERNAL_SERVER_ERROR, HttpResCode.INTERNAL_SERVER_ERROR);
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
