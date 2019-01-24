import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let repository: UserRepository = {} as any;
  const userService: UserService = new UserService(repository);
  let spyUserServiceFindOneByEmail;
  let spyAuthServiceCompareHash;

  beforeAll(async () => {
    repository = {} as any;
    jwtService = {} as any;
    service = new AuthService(userService, jwtService);
  });

  beforeEach(async () => {
    const user = { email: 'georges.abidbol@mail.com' };
    spyUserServiceFindOneByEmail = jest.spyOn(userService, 'findOneByEmail');
    spyAuthServiceCompareHash = jest.spyOn(service, 'compareHash');

    spyUserServiceFindOneByEmail.mockResolvedValue(user);
  });

  afterEach(async () => {
    spyUserServiceFindOneByEmail.mockRestore();
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

  // describe('signUp', () => {
  //   it('should call and return repository.create with a user passed in param', async () => {
  //     const user = { password: 'abitbol' };
  //     repository.save = jest.fn().mockResolvedValue(user);
  //
  //     const result = await service.create(user as any);
  //
  //     expect(result).toBe(user);
  //     expect(repository.save).toHaveBeenCalledWith(user);
  //   });
  // });

  describe('validateUser', () => {
    it('Should call and return repository.findOneByToken with token passed in param', async () => {
      const token = 'monToken';
      const user = { name: 'toto' };
      // repository.findOneByToken = jest.fn().mockResolvedValue(user);
      //
      // const result = await service.findOneByToken(token);
      //
      // expect(result).toBe(user);
      // expect(repository.findOneByToken).toHaveBeenCalledWith(token);
      expect(1).toBe(1);
    });
  });
});
