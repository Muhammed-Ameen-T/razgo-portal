import { injectable, inject } from 'inversify';
import { TYPES } from '../../core/types';
import { IEmailService } from '../../domain/interfaces/services/IEmailService';
import { ICacheService } from '../../domain/interfaces/services/ICacheService';
import { IOtpService } from '../../domain/interfaces/services/IOtpService';

@injectable()
export class OtpService implements IOtpService {
  constructor(
    @inject(TYPES.EmailService) private _emailService: IEmailService,
    @inject(TYPES.CacheService) private _cacheService: ICacheService,
  ) {}

  /**
   * Generates OTP, stores it in cache, and sends email.
   */
  async sendOtp(email: string): Promise<void> {
    const otp = this.generateOtp();
    const ttl = 300;

    await this._cacheService.set(`otp:${email}`, otp, ttl);

    const htmlContent = this.getOtpEmailTemplate(otp);

    await this._emailService.sendEmail(email, 'Your SkillForge OTP Code', htmlContent);
  }

  /**
   * Verifies the OTP from Cache
   */
  async verifyOtp(email: string, inputOtp: string): Promise<boolean> {
    const storedOtp = await this._cacheService.get(`otp:${email}`);

    if (storedOtp === inputOtp) {
      await this._cacheService.del(`otp:${email}`);
      return true;
    }
    return false;
  }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private getOtpEmailTemplate(otp: string): string {
    return `
            <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; max-width: 400px; margin: 40px auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center; background-color: #ffffff;">
                <h2 style="margin-bottom: 12px; color: #333;">🔐 SkillForge AI</h2>
                <p style="margin: 0 0 16px; font-size: 15px; color: #555;">Use the following one‑time password to verify your login:</p>
                <div style="display: inline-block; padding: 12px 24px; font-size: 22px; font-weight: bold; color: #ffffff; background-color: #007bff; border-radius: 8px; letter-spacing: 2px;">
                    ${otp}
                </div>
                <p style="margin-top: 20px; font-size: 14px; color: #d9534f;">⚠️ This code expires in 5 minutes.</p>
            </div>
        `;
  }
}
