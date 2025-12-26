import { Schema, model } from 'mongoose';
import { IUser } from '../../domain/interfaces/model/user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },

    role: {
      type: String,
      enum: ['student', 'instructor', 'admin'],
      default: 'student',
    },

    isVerified: { type: Boolean, default: false },

    authProvider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local',
    },

    providerId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true },
);

export const UserModel = model<IUser>('User', userSchema);
