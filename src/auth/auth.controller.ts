import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { User } from '../user/entity/user.entity';
import { ValidateEmailPipe } from '../user/pipes/validate-email.pipe';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'Connexion effectuée.',
  })
  @ApiBadRequestResponse({
    description: 'Requête mal formée.',
  })
  login(@Body() payload: SignInDto): Promise<string> {
    return this.authService.signIn(payload.email, payload.password);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Utilisateur inséré en base.',
  })
  @ApiBadRequestResponse({
    description: 'Requête mal formée.',
  })
  @UsePipes(ValidateEmailPipe)
  async register(@Body() registerDto: RegisterDto) {
    // Create new user from dto
    const user = new User(registerDto);
    // Pass the user entity to the service
    return this.authService.signUp(user);
  }
}
