import { inject, injectable } from 'inversify';
import { TYPES } from '../../core/types';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository';
import { IJwtService } from '../../domain/interfaces/services/IJwtService';
import { IGithubAuthService } from '../../domain/interfaces/services/ISocialLogin';
import { IGithubLoginUseCase } from '../../domain/interfaces/useCases/socialLogin.interface';
import { AuthResponseDTO, SocialLoginDTO } from '../dtos/auth.dto';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import { CustomError } from '../../utils/errors/custom.error';
import { ErrorMsg } from '../../utils/constants/commonErrorMsg.constants';

/**
 * Handles authentication via GitHub.
 * Exchanges auth code for profile, finds/creates user, and issues tokens.
 */
@injectable()
export class GithubLoginUseCase implements IGithubLoginUseCase {
  constructor(
    @inject(TYPES.UserRepository) private _userRepository: IUserRepository,
    @inject(TYPES.GithubAuthService) private _githubAuthService: IGithubAuthService,
    @inject(TYPES.JwtService) private _jwtService: IJwtService,
  ) {}

  /**
   * Executes the GitHub login logic.
   * @param dto - DTO containing the GitHub authorization code.
   * @returns Promise resolving to the authentication response.
   */
  async execute(dto: SocialLoginDTO): Promise<AuthResponseDTO> {
    const socialProfile = await this._githubAuthService.getUserProfile(dto.code);

    let user = await this._userRepository.findByEmail(socialProfile.email);

    if (!user) {
      user = await this._userRepository.create({
        name: socialProfile.name,
        email: socialProfile.email,
        authProvider: 'github',
        providerId: socialProfile.providerId,
        avatar: socialProfile.avatar,
        role: 'student',
        isVerified: true,
      });
    } else {
      if (!user.providerId || user.authProvider !== 'github') {
        await this._userRepository.update(user._id.toString(), {
          providerId: socialProfile.providerId,
          authProvider: 'github',
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
