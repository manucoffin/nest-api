import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

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
}
