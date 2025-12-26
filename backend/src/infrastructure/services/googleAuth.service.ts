import axios from 'axios';
import { injectable } from 'inversify';
import { env } from '../../config/env.config';
import { CustomError } from '../../utils/errors/custom.error';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import {
  IGoogleAuthService,
  ISocialUserProfile,
} from '../../domain/interfaces/services/ISocialLogin';

@injectable()
export class GoogleAuthService implements IGoogleAuthService {
  async getUserProfile(code: string): Promise<ISocialUserProfile> {
    try {
      const { data: tokenData } = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: env.GOOGLE_REDIRECT_URI,
      });

      const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });

      return {
        name: profile.name,
        email: profile.email,
        avatar: profile.picture,
        providerId: profile.id,
      };
    } catch (error) {
      console.error('Google Auth Error:', error);
      throw new CustomError('Failed to authenticate with Google', HttpResCode.BAD_REQUEST);
    }
  }
}
