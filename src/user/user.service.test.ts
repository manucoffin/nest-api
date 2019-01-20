import { error } from 'util';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeAll(async () => {
    repository = {} as any;
    service = new UserService(repository);
  });

  describe('getById', () => {
    it('should call and return repository.findOne with id passed in param', async () => {
      const id = 'monId';
      const user = { name: 'toto' };
      repository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.getById(id);

      expect(result).toBe(user);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('findOneByEmail', () => {
    it('should call and return repository.find with an email pass in param', async () => {
      const email = 'georges.abitbol@mail.com';
      const options = { where: { email } };
      const user = { email };
      repository.find = jest.fn().mockResolvedValue(user);

      const result = await service.findOneByEmail(email);

      expect(result).toBe(user);
      expect(repository.find).toHaveBeenCalledWith(options);
    });
  });

  // describe('create', () => {
  //   it('should call and return repository.create with', async () => {
  //     const user = { name: 'toto' };
  //     repository.create = jest.fn().mockResolvedValue(user);
  //
  //     const result = await service.create(user as any);
  //
  //     expect(result).toBe(user);
  //     expect(repository.save).toHaveBeenCalledWith({ ...user });
  //   });
  // });

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
