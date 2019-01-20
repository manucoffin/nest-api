import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  private saltRounds = 10;

  async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Creates a new instance of User in the database
   *
   * @param user
   * @returns Resolves with a created User
   */
  async create(user: User) {
    const newUser = user;
    newUser.password = await this.getHash(user.password);
    return this.userRepository.save(newUser);
  }

  /**
   * Return a user identified by its email
   *
   * @param email
   * @returns Resolves with User
   */
  async findOneByEmail(email) {
    return this.userRepository.find({
      where: { email },
    });
  }

  /**
   *
   * @param token
   */
  async findOneByToken(token) {
    return this.userRepository.findOne(token);
  }

  /**
   * Returns a user identified by its id
   *
   * @param id - user id
   * @returns Resolves with User
   */
  async getById(id: string) {
    return this.userRepository.findOne(id);
  }
  // async deleteById(userId: string) {
  //   const user = await this.userRepository.findOne(userId);
  //
  //   // if (!user) {
  //   //   throw new error
  //   // }
  // }

  /**
   * Returns a hashed string
   *
   * @param password
   * @returns Hashed string
   */
  async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
