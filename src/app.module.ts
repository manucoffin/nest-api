import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { SetReqUserMiddleware } from './auth/middlewares/set-req-user.middleware';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, CommentModule, AuthModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetReqUserMiddleware)
      .exclude(
        { path: 'article/all', method: RequestMethod.GET },
        { path: 'article', method: RequestMethod.GET },
      )
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PUT },
        ArticleController,
      );
  }
}
