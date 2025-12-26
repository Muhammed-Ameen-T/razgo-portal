import { ObjectId } from 'mongoose';

export type UserRole = 'student' | 'instructor' | 'admin';
export type AuthProvider = 'local' | 'google' | 'github';

export class User {
  constructor(
    public readonly _id: ObjectId | string,
    public name: string,
    public email: string,
    public role: UserRole,
    public isVerified: boolean,
    public authProvider: AuthProvider,
    public password?: string,
    public providerId?: string,
    public avatar?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
