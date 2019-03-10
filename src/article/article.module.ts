import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { customRepository } from '../utils/custom-repository.tools';
import { DatabaseModule } from '../utils/database/database.module';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [ArticleService, customRepository(ArticleRepository), Reflector],
  controllers: [ArticleController],
})
export class ArticleModule {}
