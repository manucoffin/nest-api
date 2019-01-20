import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  /**
   * Returns a user identified by a token
   *
   * @param token - a bearer token
   * @returns Resolves with User
   */
  async validateUser(token: string): Promise<any> {
    return await this.usersService.findOneByToken(token);
  }
}
