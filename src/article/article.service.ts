import { Inject, Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { Article } from './entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(ArticleRepository)
    private readonly articleRepository: ArticleRepository,
  ) {}

  /**
   * Return all articles
   * @returns Resolves with a list of 20 articles
   */
  async findAll(page: number): Promise<Article[]> {
    return this.articleRepository.find({ skip: page, take: 20 });
  }
}
