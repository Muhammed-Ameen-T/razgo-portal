import { Document, ObjectId } from 'mongoose';

export interface IRoadmap extends Document {
  _id: ObjectId;
  userId: ObjectId;
  title: string;
  description: string;
  targetRole: string;
  content: {
    moduleTitle: string;
    topics: {
      name: string;
      resources: string[];
      isCompleted: boolean;
    }[];
  }[];
  progress: number;
  isCompleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
