import { injectable } from 'inversify';
import { UpdateQuery } from 'mongoose';
import { IRoadmapRepository } from '../../domain/interfaces/repositories/roadmap.repository';
import { IRoadmap } from '../../domain/interfaces/model/roadmap.interface';
import { BaseRepository } from './base.repository';
import { RoadmapModel } from '../database/roadmap.model';
import { Roadmap } from '../../domain/entities/roadmap.entity';

/**
 * Repository for Roadmap entity operations.
 * Uses composition to wrap BaseRepository and return domain entities.
 */
@injectable()
export class RoadmapRepository implements IRoadmapRepository {
  private readonly _baseRepository: BaseRepository<IRoadmap>;

  constructor() {
    this._baseRepository = new BaseRepository<IRoadmap>(RoadmapModel);
  }

  /**
   * Creates a new AI-generated roadmap.
   * @param data - The roadmap data.
   * @returns The created Roadmap entity.
   */
  async create(data: Partial<Roadmap>): Promise<Roadmap> {
    const created = await this._baseRepository.create(data as unknown as Partial<IRoadmap>);
    return this.toEntity(created);
  }

  /**
   * Finds a roadmap by its unique ID.
   * @param id - The roadmap ID.
   */
  async findById(id: string): Promise<Roadmap | null> {
    const doc = await this._baseRepository.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  /**
   * Finds all roadmaps belonging to a specific user.
   * @param userId - The ID of the student.
   */
  async findByUser(userId: string): Promise<Roadmap[]> {
    // Manually casting strict type for the filter
    const docs = await this._baseRepository.find({ userId } as any);
    return docs.map((doc) => this.toEntity(doc));
  }

  /**
   * Updates a roadmap (e.g., progress update).
   * Throws error if not found to match strict return type.
   * @param id - Roadmap ID.
   * @param data - Data to update.
   */
  async update(id: string, data: Partial<Roadmap>): Promise<Roadmap> {
    const updated = await this._baseRepository.update(id, data as UpdateQuery<IRoadmap>);

    if (!updated) {
      throw new Error('Roadmap not found');
    }

    return this.toEntity(updated);
  }

  /**
   * Deletes a roadmap.
   * @param id - Roadmap ID.
   */
  async delete(id: string): Promise<void> {
    await this._baseRepository.delete(id);
  }

  /**
   * Maps Mongoose Document to Domain Entity.
   */
  private toEntity(model: IRoadmap): Roadmap {
    return new Roadmap(
      model._id.toString(),
      model.userId.toString(),
      model.title,
      model.description,
      model.targetRole,
      model.content,
      model.progress,
      model.isCompleted,
      model.createdAt,
      model.updatedAt,
    );
  }
}
