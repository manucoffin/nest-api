import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

describe('Article Controller', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeAll(async () => {
    service = {} as any;
    controller = new ArticleController(service);
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
});
