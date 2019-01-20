import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { ValidateEmailPipe } from './pipes/validate-email.pipe';
import { UserService } from './user.service';

@ApiUseTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
    return this.userService.create(user);
  }

  @Get('all')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs retournée.',
  })
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return [];
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilisateur trouvé et retourné',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User non trouvé :/',
  })
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }
}
