import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entity/user.entity';
import { ValidateEmailPipe } from '../user/pipes/validate-email.pipe';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiCreatedResponse({
    description: 'Utilisateur inséré en base.',
  })
  @ApiBadRequestResponse({
    description: 'Requête mal formée.',
  })
  @UsePipes(ValidateEmailPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Create new user from dto
    const user = new User(createUserDto);
    // Pass the user entity to the service
    return this.authService.signUp(user);
  }

  @Post('login')
  @ApiOkResponse({
    description: 'Connexion effectuée.',
  })
  @ApiBadRequestResponse({
    description: 'Requête mal formée.',
  })
  login(@Body() payload): Promise<string> {
    return this.authService.signIn(payload.email, payload.password);
  }

  // @Post('register')
  // async registerUser(@Response() res: any, @Body() body: User) {
  //   if (!(body && body.email && body.password)) {
  //     return res
  //       .status(HttpStatus.FORBIDDEN)
  //       .json({ message: 'Username and password are required!' });
  //   }
  //
  //   let user = await this.userService.findOneByEmail(body.email)[0];
  //
  //   if (user) {
  //     return res
  //       .status(HttpStatus.FORBIDDEN)
  //       .json({ message: 'Username exists' });
  //   } else {
  //     user = await this.userService.create(body);
  //     if (user) {
  //       user.passwordHash = undefined;
  //     }
  //   }
  //
  //   return res.status(HttpStatus.OK).json(user);
  // }
}
