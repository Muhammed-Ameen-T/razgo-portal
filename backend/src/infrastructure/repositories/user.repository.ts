import { injectable } from 'inversify';
import { UpdateQuery } from 'mongoose';
import { IUserRepository } from '../../domain/interfaces/repositories/user.repository';
import { IUser } from '../../domain/interfaces/model/user.interface';
import { BaseRepository } from './base.repository';
import { UserModel } from '../database/user.model';
import { User } from '../../domain/entities/user.entity';

/**
 * Repository for User entity operations.
 * Implements the domain interface using composition to separate database logic.
 */
@injectable()
export class UserRepository implements IUserRepository {
  private readonly _baseRepository: BaseRepository<IUser>;

  constructor() {
    this._baseRepository = new BaseRepository<IUser>(UserModel);
  }

  /**
   * Finds a user by their email address.
   * @param email - The email to search for.
   * @returns A Promise resolving to the User entity or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email.toLowerCase() })
      .select('+password')
      .lean<IUser>()
      .exec();
    return user ? this.toEntity(user) : null;
  }

  /**
   * Finds a user by their unique ID.
   * @param id - The user ID.
   * @returns A Promise resolving to the User entity or null if not found.
   */
  async findById(id: string): Promise<User | null> {
    const user = await this._baseRepository.findById(id);
    return user ? this.toEntity(user) : null;
  }

  /**
   * Creates a new user in the database.
   * @param data - The user data to create.
   * @returns A Promise resolving to the created User entity.
   */
  async create(data: Partial<User>): Promise<User> {
    const newUser = await this._baseRepository.create({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      isVerified: data.isVerified,
      authProvider: data.authProvider,
      providerId: data.providerId,
      avatar: data.avatar,
    } as unknown as Partial<IUser>);

    return this.toEntity(newUser);
  }

  /**
   * Updates an existing user.
   * Throws an error if the user is not found to satisfy strict interface return type.
   * @param id - The ID of the user to update.
   * @param data - The data to update.
   * @returns A Promise resolving to the updated User entity.
   */
  async update(id: string, data: Partial<User>): Promise<User> {
    const updatedUser = await this._baseRepository.update(id, data as UpdateQuery<IUser>);

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return this.toEntity(updatedUser);
  }

  /**
   * Maps the Mongoose document to the Domain Entity.
   * @param model - The database model.
   * @returns The User domain entity.
   */
  private toEntity(model: IUser): User {
    const id = model._id.toString();

    return new User(
      id,
      model.name,
      model.email,
      model.role,
      model.isVerified,
      model.authProvider,
      model.password,
      model.providerId,
      model.avatar,
      model.createdAt,
      model.updatedAt,
    );
  }
}
