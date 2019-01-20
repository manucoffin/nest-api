import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { getConnection } from 'typeorm';
import { setupDB } from '../../test/tools/setup.tools';
import { UserModule } from './user.module';
import { UserRepository } from './user.repository';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await setupDB();
  });

  it('GET /user/:id', () => {
    const userRepository = getConnection().getCustomRepository(UserRepository);

    userRepository.save({ userId: 'kkjjk', email: 'fhjkehhej@mail.com' });

    return request(app.getHttpServer())
      .get('/user/fefe')
      .expect(200)
      .then(async () => {
        const result = await getConnection()
          .getCustomRepository(UserRepository)
          .find();
        global.console.log(result);
      });
  });

  it('POST /user', () => {
    // const userRepository = getConnection().getCustomRepository(UserRepository);
    //
    // userRepository.save({ userId: 'kkjjk', email: 'fhjkehhej@mail.com' });

    return request(app.getHttpServer())
      .post('/user')
      .expect(200)
      .then(async () => {
        const result = await getConnection()
          .getCustomRepository(UserRepository)
          .save({ userId: 'kkjjk', email: 'fhjkehhej@mail.com' });
        global.console.log(result);
      });
  });
});
