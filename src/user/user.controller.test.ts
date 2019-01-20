import { User } from './entity/user.entity';
import { UserCategory } from './enums/user-category.enum';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeAll(async () => {
    service = {} as any;
    controller = new UserController(service);
  });

  describe('getById', () => {
    it('should return the result of service.getById', async () => {
      const id = 'monId';
      const user = { name: 'toto' };
      service.getById = jest.fn().mockResolvedValue(user);

      const result = await controller.getById(id);

      expect(result).toBe(user);
      expect(service.getById).toHaveBeenCalledWith(id);
    });
  });

  describe('createUser', () => {
    it('should return the result of service.create', async () => {
      const user = new User({
        avatar: new ArrayBuffer(0),
        category: UserCategory.Standard,
        email: 'a',
        firstName: 'a',
        lastName: 'a',
        mobilePhone: 'a',
        password: 'a',
      });
      service.create = jest.fn().mockResolvedValue(user);

      const result = await controller.createUser(user);

      expect(result).toBe(user);
      expect(service.create).toHaveBeenCalledWith(user);
    });
  });
});
