import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  /**
   * Creates a new instance of User in the database
   * @param user
   * @returns Resolves with a created User
   */
  async create(user: User) {
    return this.userRepository.save(user);
  }

  /**
   * Return a user identified by its email
   * @param email
   * @returns Resolves with User
   */
  async findOneByEmail(email): Promise<User[]> {
    return this.userRepository.find({
      where: { email },
    });
  }

  /**
   * Returns a user identified by its id
   * @param id
   * @returns Resolves with a User
   */
  async findOneById(id): Promise<User> {
    return this.userRepository.findOne(id);
  }

  /**
   *
   * @param token
   */
  async findOneByToken(token) {
    return this.userRepository.findOne(token);
  }

  /**
   * Returns a hashed string
   * @param password
   * @returns Hashed string
   */
  public async getHash(password: string | undefined): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Update the authenticated user in database
   * @param user
   * @throws {ForbiddenException} - If trying to update with an existing email
   * @returns Updated user
   */
  async update(user: User) {
    if (user.email) {
      const existingUser = await this.findOneByEmail(user.email);
      // Si l'utilisateur essaye de mettre à jour avec un email déjà existant chez un autre user
      if (existingUser[0] && existingUser[0].id !== user.id) {
        throw new ForbiddenException('Cet email est déjà utilisé.');
      }
    }

    const updatedUser = user;
    if (user.password) {
      updatedUser.password = await this.getHash(user.password);
    }
    return this.userRepository.save(updatedUser);
  }

  // async deleteById(userId: string) {
  //   const user = await this.userRepository.findOne(userId);
  //
  //   // if (!user) {
  //   //   throw new error
  //   // }
  // }
}
