import { Model, FilterQuery, UpdateQuery, Document } from 'mongoose';
import { injectable, unmanaged } from 'inversify';

/**
 * Generic base repository for Mongoose models.
 * @template T - The interface extending Mongoose Document
 */
@injectable()
export class BaseRepository<T extends Document> {
  constructor(@unmanaged() private readonly model: Model<T>) {}

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filter).lean<T[]>().exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).lean<T | null>().exec();
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    await doc.save();
    return doc.toObject() as T;
  }

  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true }).lean<T>().exec();
    return updated || null;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
}
