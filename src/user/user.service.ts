import { Inject, Injectable } from '@nestjs/common';
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
  async findOneByEmail(email) {
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

  // async deleteById(userId: string) {
  //   const user = await this.userRepository.findOne(userId);
  //
  //   // if (!user) {
  //   //   throw new error
  //   // }
  // }
}
