import { User } from '../user/entity/user.entity';
import { UserCategory } from '../user/enums/user-category.enum';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    authService = {} as any;
    controller = new AuthController(authService);
  });

  describe('register', () => {
    it('Should return the result of service.signUp', async () => {
      const user = new User({
        avatar: new ArrayBuffer(0),
        category: UserCategory.Standard,
        email: 'a',
        firstName: 'a',
        lastName: 'a',
        mobilePhone: 'a',
        password: 'a',
      });
      authService.signUp = jest.fn().mockResolvedValue(user);

      const result = await controller.register(user);

      expect(result).toBe(user);
      expect(authService.signUp).toHaveBeenCalledWith(user);
    });
  });

  describe('login', () => {
    it('Should return the result of service.signIn', async () => {
      const credentials = {
        email: 'georges.abidbol@mail.com',
        password: 'azerty',
      };
      const token = 'myToken';

      authService.signIn = jest.fn().mockResolvedValue(token);

      const result = await controller.login(credentials);

      expect(result).toBe(token);
      expect(authService.signIn).toHaveBeenCalledWith(
        credentials.email,
        credentials.password,
      );
    });
  });
});
