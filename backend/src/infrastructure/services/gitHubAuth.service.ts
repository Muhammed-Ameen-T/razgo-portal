import axios from 'axios';
import { injectable } from 'inversify';
import { env } from '../../config/env.config';
import { CustomError } from '../../utils/errors/custom.error';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import {
  IGithubAuthService,
  ISocialUserProfile,
} from '../../domain/interfaces/services/ISocialLogin';

@injectable()
export class GithubAuthService implements IGithubAuthService {
  async getUserProfile(code: string): Promise<ISocialUserProfile> {
    try {
      const { data: tokenData } = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: env.GITHUB_REDIRECT_URI,
        },
        { headers: { Accept: 'application/json' } },
      );

      if (tokenData.error) throw new Error(tokenData.error_description);

      const { data: userProfile } = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });

      let email = userProfile.email;
      if (!email) {
        const { data: emails } = await axios.get('https://api.github.com/user/emails', {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        const primary = emails.find((e: any) => e.primary && e.verified);
        email = primary ? primary.email : null;
      }

      if (!email) throw new Error('No verified email found on GitHub');

      return {
        name: userProfile.name || userProfile.login,
        email: email,
        avatar: userProfile.avatar_url,
        providerId: userProfile.id.toString(),
      };
    } catch (error) {
      console.error('GitHub Auth Error:', error);
      throw new CustomError('Failed to authenticate with GitHub', HttpResCode.BAD_REQUEST);
    }
  }
}
