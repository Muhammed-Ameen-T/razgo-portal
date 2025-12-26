import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password?: string;
  role: 'student' | 'instructor' | 'admin';
  isVerified: boolean;
  authProvider: 'local' | 'google' | 'github';
  providerId?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
