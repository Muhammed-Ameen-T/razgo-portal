export interface IOtpService {
  /**
   * Generates an OTP, stores it in cache, and sends it via email.
   * @param email - The recipient's email.
   */
  sendOtp(email: string): Promise<void>;

  /**
   * Verifies if the provided OTP matches the stored one.
   * @param email - The user's email.
   * @param otp - The input OTP.
   */
  verifyOtp(email: string, otp: string): Promise<boolean>;
}
