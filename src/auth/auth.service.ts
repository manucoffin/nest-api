import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private saltRounds = 10;

  /**
   * Check that the password matches the hash
   * @param password
   * @param hash
   * @returns {boolean}
   */
  public async compareHash(
    password: string | undefined,
    hash: string | undefined,
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Returns a signed JWT token
   * @param uuid
   * @returns {string} - signed token
   */
  public createToken(uuid): string {
    const userId: IJwtPayload = { uuid };
    return this.jwtService.sign(userId);
  }

  /**
   * Returns a token if the credentials are correct
   * @param email
   * @param password
   * @throws {BadRequestException} - If some of the credentials are missing
   * @throws {ForbiddenException} - If user is not found
   * @returns Resolves with a token
   */
  public async signIn(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new BadRequestException("L'email et le mot de passe sont requis.");
    }

    const user = await this.userService.findOneByEmail(email);

    if (user.length > 0) {
      if (await this.compareHash(password, user[0].password)) {
        return await this.createToken(user[0].email);
      }
    }

    throw new ForbiddenException('Les identifiants sont incorrects.');
  }

  /**
   * Register the user in DB
   * @param user
   * @returns Resolves with a User
   */
  public async signUp(user): Promise<User> {
    const newUser = user;
    newUser.password = await this.getHash(user.password);
    return this.userService.create(newUser);
  }

  /**
   * Returns a hashed string
   * @param password
   * @returns Hashed string
   */
  protected async getHash(password: string | undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Check that the token is valid
   * @param payload -
   * @returns {boolean} - true if the token is valid
   */
  protected async validateToken(payload: IJwtPayload): Promise<boolean> {
    const user = await this.userService.findOneById(payload.uuid);
    return !!user;
  }
}
