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
   * Creates a new instance of Article in the database
   * @param article
   * @returns Resolves with a created Article
   */
  async create(article: Article) {
    // check if author
    return this.articleRepository.save(article);
  }

  /**
   * Return all articles
   * @returns Resolves with a list of 20 articles
   */
  async findAll(page: number): Promise<Article[]> {
    return this.articleRepository.find({ skip: (page - 1) * 20, take: 20 });
  }

  async findOneById(articleId: string): Promise<Article> {
    return this.articleRepository.findOne(articleId, {
      relations: ['author'],
    });
  }
}
