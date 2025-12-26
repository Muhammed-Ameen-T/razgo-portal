export interface ISocialUserProfile {
  name: string;
  email: string;
  avatar?: string;
  providerId: string;
}

export interface IGoogleAuthService {
  getUserProfile(code: string): Promise<ISocialUserProfile>;
}

export interface IGithubAuthService {
  getUserProfile(code: string): Promise<ISocialUserProfile>;
}
