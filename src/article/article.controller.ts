import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  ReflectMetadata,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiImplicitQuery,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { RegisterDto } from '../auth/dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entity/article.entity';
import { RolesGuard } from './guards/roles.guard';

@ApiUseTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Roles('Author')
  @UseGuards(new JwtAuthGuard())
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Article created.',
  })
  @ApiForbiddenResponse({
    description: 'Only Authors can create articles.',
  })
  async create(@Req() req, @Body() createArticleDto: CreateArticleDto) {
    const article = new Article(createArticleDto);
    article.author = req.payload.token.uuid;
    return this.articleService.create(article);
  }

  @Delete(':id')
  @Roles('Author')
  @UseGuards(new JwtAuthGuard())
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Article deleted.',
  })
  @ApiForbiddenResponse({
    description: 'Only Authors can delete articles.',
  })
  async delete(@Param('id') articleId: string) {
    return this.articleService.delete(articleId);
  }

  @Get('all')
  @ApiImplicitQuery({
    name: 'page',
    description: 'Offset used to select the articles',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Articles list returned.',
  })
  async getAll(@Query() page: string) {
    const offset = +page || 1;
    return this.articleService.findAll(offset);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Article found.',
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
  })
  async getById(@Param('id') articleId: string) {
    return this.articleService.findOneById(articleId);
  }
}
