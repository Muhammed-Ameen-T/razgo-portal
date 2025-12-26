import { Roadmap } from '../../entities/roadmap.entity';

export interface IRoadmapRepository {
  create(data: Partial<Roadmap>): Promise<Roadmap>;
  findById(id: string): Promise<Roadmap | null>;
  findByUser(userId: string): Promise<Roadmap[]>;
  update(id: string, data: Partial<Roadmap>): Promise<Roadmap>;
  delete(id: string): Promise<void>;
}
