import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';

describe('Article Controller', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeAll(async () => {
    service = {} as any;
    controller = new ArticleController(service);
  });

  describe('create', () => {
    it('Should return the result of service.create', async () => {
      const authorId = '91f93bb3-becb-4980-b392-b6034fea1c4b';
      const request = { payload: { token: { uuid: authorId } } };
      const article = new Article({ title: 'Title 1', content: 'blablabla' });
      article.author = request.payload.token.uuid;

      service.create = jest.fn().mockResolvedValue(article);

      const result = await controller.create(request, article as any);

      expect(result).toBe(article);
      expect(service.create).toHaveBeenCalledWith(article);
    });
  });

  describe('getAll', () => {
    it('Should return the result of service.findAll', async () => {
      const articles = [{ title: 'article 1' }, { title: 'article 2' }];
      const page = '1';

      service.findAll = jest.fn().mockResolvedValue(articles);

      const result = await controller.getAll(page);

      expect(result).toBe(articles);
      expect(service.findAll).toHaveBeenCalledWith(+page);
    });
  });

  describe('getById', () => {
    it('Should return the result of service.getById', async () => {
      const id = 'e723231f-1b95-45ee-b2a3-d4695c285899';
      const article = { title: 'Test Title' };
      service.findOneById = jest.fn().mockResolvedValue(article);

      const result = await controller.getById(id);

      expect(result).toBe(article);
      expect(service.findOneById).toHaveBeenCalledWith(id);
    });
  });
});
