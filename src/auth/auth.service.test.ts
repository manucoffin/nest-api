import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let repository: UserRepository = {} as any;
  const userService: UserService = new UserService(repository);
  let spyUserServiceFindOneByEmail;
  let spyUserServiceFindOneById;
  let spyUserServiceCreate;
  let spyAuthServiceCompareHash;
  let spyAuthServiceGetHash;

  beforeAll(async () => {
    repository = {} as any;
    jwtService = {} as any;
    service = new AuthService(userService, jwtService);
  });

  beforeEach(async () => {
    const user = { email: 'georges.abidbol@mail.com' };

    spyUserServiceFindOneByEmail = jest.spyOn(userService, 'findOneByEmail');
    spyUserServiceFindOneById = jest.spyOn(userService, 'findOneById');
    spyUserServiceCreate = jest.spyOn(userService, 'create');
    spyAuthServiceCompareHash = jest.spyOn(service, 'compareHash');
    spyAuthServiceGetHash = jest.spyOn(service, 'getHash');

    spyUserServiceFindOneByEmail.mockResolvedValue(user);
  });

  afterEach(async () => {
    spyUserServiceFindOneByEmail.mockRestore();
    spyUserServiceFindOneById.mockRestore();
    spyUserServiceCreate.mockRestore();
  });

  describe('createToken', () => {
    it('Should return a signed token', () => {
      const token = 'myToken';
      const uuid = 'myId';

      jwtService.sign = jest.fn().mockReturnValue(token);
      const result = jwtService.sign(uuid);

      expect(result).toBe(token);
      expect(jwtService.sign).toHaveBeenCalledWith(uuid);
    });
  });

  describe('signIn', () => {
    it('Should return the result of userService.findOneByEmail', async () => {
      const user = { email: 'georges.abidbol@mail.com' };
      const email = 'georges.abidbol@mail.com';

      const result = await userService.findOneByEmail(email);

      expect(result).toEqual(user);
      expect(userService.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it('Should return the result of service.compareHash', async () => {
      const password = 'azerty';
      const hash = 'azerty';

      spyAuthServiceCompareHash.mockResolvedValue(true);
      const result = await service.compareHash(password, hash);

      expect(result).toBe(true);
      expect(service.compareHash).toHaveBeenCalledWith(password, hash);
    });

    it('Should return the result of service.createToken if compareHash returns true', async () => {
      const signedToken = 'aaa.bbb.ccc';
      const uuid = 'myId';
      const password = 'azerty';
      const hash = 'azerty';

      service.createToken = jest.fn().mockReturnValue(signedToken);

      spyAuthServiceCompareHash.mockResolvedValue(true);
      const passwordValid = await service.compareHash(password, hash);

      const result = passwordValid ? service.createToken(uuid) : '';

      expect(result).toBe(signedToken);
      expect(service.createToken).toHaveBeenCalledWith(uuid);
    });

    it('Should not call service.createToken if compareHash returns false', async () => {
      const signedToken = 'aaa.bbb.ccc';
      const uuid = 'myId';
      const password = 'azerty';
      const hash = 'azerty';

      service.createToken = jest.fn().mockReturnValue(signedToken);

      spyAuthServiceCompareHash.mockResolvedValue(false);
      const passwordValid = await service.compareHash(password, hash);

      const result = passwordValid ? service.createToken(uuid) : '';

      expect(service.createToken).not.toHaveBeenCalled();
    });
  });

  describe('compareHash', () => {
    const saltRounds = 10;
    const password = 'azerty';
    const hash = bcrypt.hash(password, saltRounds);

    it('Should return true if password match hash', async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const result = await bcrypt.compare(password, hash);

      expect(result).toBe(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });

    it('Should return false if password does not match hash', async () => {
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      const result = await bcrypt.compare(password, hash);

      expect(result).toBe(false);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hash);
    });
  });

  describe('signUp', () => {
    it('Should call authService.getHash and set the user password with the hash.', async () => {
      const newUser = new User();
      const password = 'password';
      const hashedPassword = 'hashedPassword';
      spyAuthServiceGetHash.mockResolvedValue('hashedPassword');

      newUser.password = await service.getHash(password);

      expect(newUser.password).toBe(hashedPassword);
      expect(service.getHash).toHaveBeenCalledWith(password);
    });

    it('Should call and return userService.create with a user passed in params.', async () => {
      const user = { email: 'georges.abidbol@mail.com' };
      const newUser = new User();
      spyUserServiceCreate.mockResolvedValue(user);

      const result = await userService.create(newUser);

      expect(result).toBe(user);
      expect(userService.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe('getHash', () => {
    it('Should call and return the result of bcrypt.hash.', async () => {
      const saltRounds = 10;
      const password = 'azerty';
      const hashedPassword = 'hashedPassword';

      bcrypt.hash = jest.fn().mockReturnValue(hashedPassword);
      const hash = bcrypt.hash(password, saltRounds);

      expect(hash).toBe(hashedPassword);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, saltRounds);
    });
  });

  describe('validateToken', () => {
    it('Should call userService.findOneById with an uuid passed in params, and return true if a user is found.', async () => {
      const mockUser = { email: 'georges.abidbol@mail.com' };
      const uuid = 'fe494765-20b5-41a6-845f-94f9fc438e90';

      spyUserServiceFindOneById.mockResolvedValue(mockUser);

      const user = await userService.findOneById(uuid);
      const result = !!user;

      expect(user).toBe(mockUser);
      expect(result).toBe(true);
      expect(userService.findOneById).toHaveBeenCalledWith(uuid);
    });

    it('Should call userService.findOneById with an uuid passed in params, and return false if no user is found.', async () => {
      const uuid = 'fe494765-20b5-41a6-845f-94f9fc438e90';

      spyUserServiceFindOneById.mockResolvedValue(null);

      const user = await userService.findOneById(uuid);
      const result = !!user;

      expect(user).toBe(null);
      expect(result).toBe(false);
      expect(userService.findOneById).toHaveBeenCalledWith(uuid);
    });
  });
});
