import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { IUserAuthController } from '../../domain/interfaces/controllers/userAuth.controller.interface';
import { ISendOtpUseCase } from '../../domain/interfaces/useCases/sentOtpUser.interface';
import { ILoginUserUseCase } from '../../domain/interfaces/useCases/loginUser.interface';
import { IVerifyOtpUseCase } from '../../domain/interfaces/useCases/verifyOtpUser.interface';
import { HttpResCode } from '../../utils/constants/httpResponseCode.utils';
import { sendResponse } from '../../utils/response/sendResponse.utils';
import { TYPES } from '../../core/types';
import { SuccessMsg } from '../../utils/constants/commonSuccessMsg.constants';
import { LoginDTO, VerifyOtpDTO, SocialLoginDTO } from '../../application/dtos/auth.dto';
import { env } from '../../config/env.config';
import { IGithubLoginUseCase, IGoogleLoginUseCase } from '../../domain/interfaces/useCases/socialLogin.interface';

/**
 * Controller for handling user authentication.
 * Orchestrates OTP registration, Local Login, and Social Login (Google/GitHub).
 * @implements {IUserAuthController}
 */
@injectable()
export class UserAuthController implements IUserAuthController {
  /**
   * Constructs an instance of UserAuthController with all required Use Cases.
   */
  constructor(
    @inject(TYPES.SendOtpUseCase) private _sendOtpUseCase: ISendOtpUseCase,
    @inject(TYPES.VerifyOtpUseCase) private _verifyOtpUseCase: IVerifyOtpUseCase,
    @inject(TYPES.UserLoginUseCase) private _loginUserUseCase: ILoginUserUseCase,
    @inject(TYPES.GoogleLoginUseCase) private _googleLoginUseCase: IGoogleLoginUseCase,
    @inject(TYPES.GithubLoginUseCase) private _githubLoginUseCase: IGithubLoginUseCase
  ) {}

  /**
   * Sends an OTP to the provided email address for user registration.
   * @param {Request} req - Express request with email in body.
   */
  async sendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;
      await this._sendOtpUseCase.execute(email.trim());
      sendResponse(res, HttpResCode.OK, SuccessMsg.OTP_SENT);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verifies the OTP and completes user registration.
   * Sets the Refresh Token in an HTTP-Only cookie.
   * @param {Request} req - Express request with registration details.
   */
  async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // NOTE: Removed 'phoneNumber' to match new Schema
      const { name, email, password, otp } = req.body;

      const dto = new VerifyOtpDTO(name, email, password, otp);
      const result = await this._verifyOtpUseCase.execute(dto);

      this.setRefreshTokenCookie(res, result.refreshToken);

      sendResponse(res, HttpResCode.OK, SuccessMsg.USER_REGISTERED, {
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles local user login (Email/Password).
   * @param {Request} req - Express request with credentials.
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const dto = new LoginDTO(email, password);
      const result = await this._loginUserUseCase.execute(dto);

      this.setRefreshTokenCookie(res, result.refreshToken);

      sendResponse(res, HttpResCode.OK, SuccessMsg.USER_LOGGED_IN, {
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles Google OAuth Login.
   * Expects 'code' from the frontend (Authorization Code Flow).
   */
  async googleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = req.body;
      
      const dto = new SocialLoginDTO(code);
      const result = await this._googleLoginUseCase.execute(dto);

      this.setRefreshTokenCookie(res, result.refreshToken);

      sendResponse(res, HttpResCode.OK, SuccessMsg.USER_LOGGED_IN, {
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles GitHub OAuth Login.
   * Expects 'code' from the frontend.
   */
  async githubLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { code } = req.body;

      const dto = new SocialLoginDTO(code);
      const result = await this._githubLoginUseCase.execute(dto);

      this.setRefreshTokenCookie(res, result.refreshToken);

      sendResponse(res, HttpResCode.OK, SuccessMsg.USER_LOGGED_IN, {
        accessToken: result.accessToken,
        user: result.user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logs out the user by clearing the refresh token cookie.
   */
  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'none',
      });
      sendResponse(res, HttpResCode.OK, SuccessMsg.USER_LOGGED_OUT);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Helper method to set standardized Refresh Token cookies.
   */
  private setRefreshTokenCookie(res: Response, token: string): void {
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: parseInt(env.MAX_AGE || '604800000', 10), 
    });
  }
}