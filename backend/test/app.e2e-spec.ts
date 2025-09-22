import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { sampleData } from './../src/data/testData';
import { DbService } from '../src/db.service';
import { CoffeeItem } from '../src/types';

describe('App E2E', () => {
  let app: INestApplication;
  let db: DbService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    db = app.get<DbService>(DbService);
    console.log('Using DB:', db['pool'].options.database);
  });

  beforeEach(async () => {
    // Reset DB before each test
    await db.query('TRUNCATE TABLE coffees RESTART IDENTITY CASCADE');
    const insertPromises = sampleData.map((item: CoffeeItem) =>
      db.query(
        'INSERT INTO coffees (title, description, price, imageUrl, category) VALUES ($1, $2, $3, $4, $5)',
        [
          item.title,
          item.description,
          item.price,
          item.imageUrl,
          item.category,
        ],
      ),
    );
    await Promise.all(insertPromises);
  });

  afterAll(async () => {
    await app.close();
    await db.closePool();
  });

  it('GET /healthcheck should return server and db status', async () => {
    const res = await request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('database');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('GET /coffees should return an array', async () => {
    const res = await request(app.getHttpServer()).get('/coffees').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /coffees should add a new coffee', async () => {
    const newCoffee = {
      title: 'Test Coffee',
      description: 'A test coffee item',
      price: 5.5,
      imageUrl: '/test-coffee.webp',
      category: 'arabica',
    };
    const postRes = await request(app.getHttpServer())
      .post('/coffees')
      .send(newCoffee)
      .expect(201);
    expect(postRes.body).toMatchObject(newCoffee);
    expect(postRes.body).toHaveProperty('id');

    // Confirm it was added
    const getRes = await request(app.getHttpServer())
      .get('/coffees')
      .expect(200);
    const found = getRes.body.find(
      (item: any) => item.title === newCoffee.title,
    );
    expect(found).toBeDefined();
    expect(found).toMatchObject(newCoffee);
  });
});
