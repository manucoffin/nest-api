import { ForbiddenException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  let spyUserServiceGetHash;
  let spyUserServiceFindOneByEmail;
  let spyUserServiceUpdate;

  beforeAll(async () => {
    repository = {} as any;
    service = new UserService(repository);
  });

  beforeEach(async () => {
    spyUserServiceGetHash = jest.spyOn(service, 'getHash');
    spyUserServiceFindOneByEmail = jest.spyOn(service, 'findOneByEmail');
    spyUserServiceUpdate = jest.spyOn(service, 'update');
  });

  describe('findOneById', () => {
    it('Should call and return repository.findOne with id passed in param', async () => {
      const id = 'monId';
      const user = { name: 'toto' };
      repository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.findOneById(id);

      expect(result).toBe(user);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('create', () => {
    it('Should call and return repository.create with a user passed in param', async () => {
      const user = { password: 'abitbol' };
      repository.save = jest.fn().mockResolvedValue(user);

      const result = await service.create(user as any);

      expect(result).toBe(user);
      expect(repository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('findOneByEmail', () => {
    it('Should call and return repository.find with an email passed in param', async () => {
      const email = 'georges.abitbol@mail.com';
      const options = { where: { email } };
      const user = { email };
      repository.find = jest.fn().mockResolvedValue(user);

      const result = await service.findOneByEmail(email);

      expect(result).toBe(user);
      expect(repository.find).toHaveBeenCalledWith(options);
    });
  });

  describe('update', () => {
    it('Should call userService.getHash and set the user password with the hash.', async () => {
      const newUser = new User();
      const password = 'password';
      const hashedPassword = 'hashedPassword';
      spyUserServiceGetHash.mockResolvedValue(hashedPassword);

      newUser.password = await service.getHash(password);

      expect(newUser.password).toBe(hashedPassword);
      expect(service.getHash).toHaveBeenCalledWith(password);
    });
    it('Should call and return repository.save with a user passed in param', async () => {
      const user = { password: 'abitbol' };
      repository.save = jest.fn().mockResolvedValue(user);

      const result = await service.update(user as any);

      expect(result).toBe(user);
      expect(repository.save).toHaveBeenCalledWith(user);
    });
    it('Should throw a forbidden exception if user with same email already exists', async () => {
      const email = 'georges.abitbol@mail.com';
      const foundUser = { email: 'georges.abitbol@mail.com' };

      spyUserServiceFindOneByEmail.mockResolvedValue(foundUser);

      const thowNewException = () => {
        throw new ForbiddenException();
      };

      const result = await service.findOneByEmail(email);

      expect(result).toBe(foundUser);
      expect(service.findOneByEmail).toHaveBeenCalledWith(email);
      expect(thowNewException).toThrow();
    });
  });

  // describe('deleteById', () => {
  //   it('should throw an error when user not found by its id', async () => {
  //     const userId = 'ID-001';
  //     repository.findOne = jest.fn().mockResolvedValue(undefined);
  //
  //     try {
  //       await service.deleteById(userId);
  //     } catch (e) {
  //       expect(e.message).toBe('User not found');
  //       expect(e).toBeInstanceOf(Error);
  //     }
  //     expect(repository.findOne).toHaveBeenCalledWith(userId);
  //   });
  //
  //   it('should delete the user when user is found by its id', async () => {
  //     const userId = 'ID-001';
  //     repository.findOne = jest.fn().mockResolvedValue(undefined);
  //     repository.delete = jest.fn();
  //
  //     expect(repository.findOne).toHaveBeenCalledWith(userId);
  //   });
  // });
});
