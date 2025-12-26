export interface IJwtService {
  generateAccessToken(userId: string, role: string): string;
  generateRefreshToken(userId: string, role: string): string;
  verifyAccessToken(token: string): { userId: string; role: string } | null;
  verifyRefreshToken(token: string): { userId: string; role: string } | null;
}
