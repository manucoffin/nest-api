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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { RegisterDto } from '../auth/dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entity/user.entity';
import { ValidateEmailPipe } from './pipes/validate-email.pipe';
import { UserService } from './user.service';

@ApiUseTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des utilisateurs retournée.',
  })
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
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
    return this.userService.findOneById(id);
  }
}
