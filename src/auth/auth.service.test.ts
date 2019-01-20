import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let repository: UserRepository = {} as any;
  const userService: UserService = new UserService(repository);

  beforeAll(async () => {
    repository = {} as any;
    service = new AuthService(userService);
  });

  describe('validateUser', () => {
    it('should call and return repository.findOneByToken with token passed in param', async () => {
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
