import { User } from './entity/user.entity';
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
    it('Should return the result of service.getById', async () => {
      const id = 'monId';
      const user = { name: 'toto' };
      service.findOneById = jest.fn().mockResolvedValue(user);

      const result = await controller.getById(id);

      expect(result).toBe(user);
      expect(service.findOneById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('Should return the result of service.update', async () => {
      const uuid = 'b6430a69-bc37-4fbb-8d2c-20924d2b12b9';
      const request = { payload: { token: { uuid } } };
      const toUpdateUser = new User();
      toUpdateUser.id = request.payload.token.uuid;

      service.update = jest.fn().mockResolvedValue(toUpdateUser);

      const result = await controller.update(request, toUpdateUser as any);

      expect(result).toBe(toUpdateUser);
      expect(service.update).toHaveBeenCalledWith(toUpdateUser);
    });
  });
});
