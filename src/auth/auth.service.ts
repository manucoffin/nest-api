import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Returns a user identified by a token
   *
   * @param token - a bearer token
   * @returns Resolves with User
   */
  // async validateUser(token: string): Promise<any> {
  //   return await this.userService.findOneByToken(token);
  // }

  // async validateUser(payload: IJwtPayload): Promise<any> {
  //   return await this.userService.findOneByEmail(payload.email);
  // }

  // async createToken(id: string, email: string) {
  //   const expiresIn = process.env.JWT_EXPIRES_IN;
  //   const secretOrKey = process.env.JWT_SECRET;
  //   const user = { email };
  //   const token = jwt.sign(user, secretOrKey, { expiresIn });
  //
  //   return { expires_in: expiresIn, token };
  // }

  async createToken(email) {
    const user: IJwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: process.env.JWT_EXPIRES_IN,
      accessToken,
    };
  }

  // async signIn(): Promise<string> {
  //   // In the real-world app you shouldn't expose this method publicly
  //   // instead, return a token once you verify user credentials
  //   const user: IJwtPayload = { email: 'user@email.com' };
  //   return this.jwtService.sign(user);
  // }

  async validateUser(payload: IJwtPayload): Promise<boolean> {
    // if (signedUser && signedUser.email) {
    // }
    const user = await this.userService.findOneByEmail(payload.email);
    return user.length > 0;

    // return false;
  }
}
