import { NextFunction, Request, Response } from 'express';

export interface IUserAuthController {
  /**
   * Initiates the OTP sending process.
   */
  sendOtp(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Verifies OTP and registers the user.
   */
  verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Handles standard email/password login.
   */
  login(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Handles Google OAuth login flow.
   */
  googleLogin(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Handles GitHub OAuth login flow.
   */
  githubLogin(req: Request, res: Response, next: NextFunction): Promise<void>;

  /**
   * Logs out the user (clears cookies).
   */
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
