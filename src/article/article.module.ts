import { Module } from '@nestjs/common';
import { customRepository } from '../utils/custom-repository.tools';
import { DatabaseModule } from '../utils/database/database.module';
import { ArticleController } from './article.controller';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';

@Module({
  imports: [DatabaseModule],
  providers: [ArticleService, customRepository(ArticleRepository)],
  controllers: [ArticleController],
})
export class ArticleModule {}
