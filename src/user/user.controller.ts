import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
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
  @ApiOkResponse({
    description: 'Utilisateur trouvé et retourné.',
  })
  @ApiNotFoundResponse({
    description: 'Utilisateur non trouvé.',
  })
  async getById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Put()
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  async update(
    // @Param('id') id: string,
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const toUpdateUser = new User(updateUserDto);
    // Le middleware set-req-user s'occupe de mettre l'id de l'user connecté dans la requête
    toUpdateUser.id = req.payload.token.uuid;
    return this.userService.update(toUpdateUser);
  }
}
