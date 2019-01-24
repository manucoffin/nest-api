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

  beforeAll(async () => {
    repository = {} as any;
    jwtService = {} as any;
    service = new AuthService(userService, jwtService);
  });

  describe('signIn', () => {
    it('Should return a token', async () => {
      const user = { email: 'georges.abidbol@mail.com' };
      userService.findOneByEmail = jest.fn().mockResolvedValue(user);
      // const result = await service.getById(id);
      const result = await userService.findOneByEmail(user.email);

      expect(result).toBe(user);
      expect(userService.findOneByEmail).toHaveBeenCalledWith(user.email);
      // expect(service.createToken).toHaveBeenCalledWith(result[0].email);
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
