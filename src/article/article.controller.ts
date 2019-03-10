import {
  Body,
  Controller,
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
  ApiOkResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { RegisterDto } from '../auth/dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../user/decorators/roles.decorator';
import { User } from '../user/entity/user.entity';
import { UserCategory } from '../user/enums/user-category.enum';
import { ValidateEmailPipe } from '../user/pipes/validate-email.pipe';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entity/article.entity';
import { RolesGuard } from './guards/roles.guard';

@ApiUseTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
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
}
