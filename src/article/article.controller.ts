import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { RegisterDto } from '../auth/dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../user/entity/user.entity';
import { ValidateEmailPipe } from '../user/pipes/validate-email.pipe';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entity/article.entity';

@ApiUseTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Article créé.',
  })
  async create(@Req() req, @Body() createArticleDto: CreateArticleDto) {
    const article = new Article(createArticleDto);
    article.author = req.payload.token.uuid;
    return this.articleService.create(article);
  }

  @Get('all')
  @ApiImplicitQuery({
    name: 'page',
    description: 'Offset used to select the articles',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Liste des articles retournée.',
  })
  async getAll(@Query() page: string) {
    const offset = +page || 1;
    return this.articleService.findAll(offset);
  }
}
