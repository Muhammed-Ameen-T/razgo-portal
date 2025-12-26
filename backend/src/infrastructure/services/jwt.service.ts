import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { env } from '../../config/env.config';
import { IJwtService } from '../../domain/interfaces/services/IJwtService';

@injectable()
export class JwtService implements IJwtService {
  private _accessSecret: string = env.ACCESS_TOKEN_SECRET;
  private _refreshSecret: string = env.REFRESH_TOKEN_SECRET;
  private _accessExpiry: string = env.ACCESS_TOKEN_EXPIRY;
  private _refreshExpiry: string = env.REFRESH_TOKEN_EXPIRY;

  /**
   * Generates an access token including User ID and Role.
   */
  generateAccessToken(userId: string, role: string): string {
    return jwt.sign({ userId, role }, this._accessSecret, {
      expiresIn: this._accessExpiry as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Generates a refresh token including User ID and Role.
   */
  generateRefreshToken(userId: string, role: string): string {
    return jwt.sign({ userId, role }, this._refreshSecret, {
      expiresIn: this._refreshExpiry as jwt.SignOptions['expiresIn'],
    });
  }

  /**
   * Verifies access token. Returns decoded payload or null if invalid.
   */
  verifyAccessToken(token: string): { userId: string; role: string } | null {
    try {
      return jwt.verify(token, this._accessSecret) as { userId: string; role: string };
    } catch (error) {
      return null;
    }
  }

  /**
   * Verifies refresh token. Returns decoded payload or null if invalid.
   */
  verifyRefreshToken(token: string): { userId: string; role: string } | null {
    try {
      return jwt.verify(token, this._refreshSecret) as { userId: string; role: string };
    } catch (error) {
      return null;
    }
  }
}
