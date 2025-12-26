import { Schema, model } from 'mongoose';
import { IRoadmap } from '../../domain/interfaces/model/roadmap.interface';

const roadmapSchema = new Schema<IRoadmap>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    targetRole: { type: String, required: true },

    content: [
      {
        moduleTitle: { type: String, required: true },
        topics: [
          {
            name: { type: String, required: true },
            resources: [{ type: String }],
            isCompleted: { type: Boolean, default: false },
          },
        ],
      },
    ],

    progress: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const RoadmapModel = model<IRoadmap>('Roadmap', roadmapSchema);
