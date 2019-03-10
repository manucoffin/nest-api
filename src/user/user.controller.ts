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
  ApiForbiddenResponse,
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
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users list returned.',
  })
  findAll() {
    return [];
  }

  @Get()
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User found and returned.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  async getById(@Req() req) {
    const uuid = req.payload.token.uuid;
    return this.userService.findOneById(uuid);
  }

  @Put()
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User updated and returned.',
  })
  @ApiForbiddenResponse({
    description: 'Email already in use.',
  })
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    const toUpdateUser = new User(updateUserDto);
    // Set-req-user middleware sets the connected user id in the request object
    toUpdateUser.id = req.payload.token.uuid;
    return this.userService.update(toUpdateUser);
  }
}
