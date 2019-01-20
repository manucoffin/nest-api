import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { HttpStrategy } from './strategies/http.strategy';

@Module({
  imports: [UserModule],
  providers: [AuthService, HttpStrategy],
})
export class AuthModule {}
