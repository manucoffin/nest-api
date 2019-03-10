import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';

@ApiUseTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

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
  getAll(@Query() page: string) {
    const offset = +page || 1;
    return this.articleService.findAll(offset);
  }
}
