import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { customRepository } from '../utils/custom-repository.tools';
import { DatabaseModule } from '../utils/database/database.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [UserService, customRepository(UserRepository)],
  exports: [UserService],
})
export class UserModule {}
