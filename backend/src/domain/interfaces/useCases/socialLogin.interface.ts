import { AuthResponseDTO, SocialLoginDTO } from '../../../application/dtos/auth.dto';

export interface IGoogleLoginUseCase {
  /**
   * Executes Google login flow.
   * @param dto - Contains the authorization code.
   * @returns Auth tokens and user info.
   */
  execute(dto: SocialLoginDTO): Promise<AuthResponseDTO>;
}

export interface IGithubLoginUseCase {
  /**
   * Executes GitHub login flow.
   * @param dto - Contains the authorization code.
   * @returns Auth tokens and user info.
   */
  execute(dto: SocialLoginDTO): Promise<AuthResponseDTO>;
}
