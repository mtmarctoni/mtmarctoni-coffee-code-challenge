import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService implements OnModuleInit {
  private pool: Pool;
  private readonly logger = new Logger(DbService.name);

  // constructor() {
  //   // Use environment variables or defaults matching README/docker-compose
  //   this.pool = new Pool({
  //     host: process.env.POSTGRES_HOST ?? 'localhost',
  //     port: Number(process.env.POSTGRES_PORT ?? 5432),
  //     user: process.env.POSTGRES_USER ?? 'postgres',
  //     password: process.env.POSTGRES_PASSWORD ?? '1234',
  //     database: process.env.POSTGRES_DB ?? 'mvst-coffee-challenge-db',
  //   });
  // }

  constructor() {
    if (process.env.DATABASE_URL) {
      // Production: use Railway's DATABASE_URL
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
      });
    } else {
      // Development: use individual variables
      this.pool = new Pool({
        host: process.env.POSTGRES_HOST ?? 'localhost',
        port: Number(process.env.POSTGRES_PORT ?? 5432),
        user: process.env.POSTGRES_USER ?? 'postgres',
        password: process.env.POSTGRES_PASSWORD ?? '1234',
        database: process.env.POSTGRES_DB ?? 'mvst-coffee-challenge-db',
      });
    }
  }

  async onModuleInit() {
    await this.createTable();
    this.logger.log('DB initialized');
  }

  async query<T = any>(text: string, params?: any[]) {
    try {
      const res = await this.pool.query<T>(text, params);
      return res;
    } catch (err) {
      this.logger.error({ message: 'DB query failed', text, params, err });
      throw err;
    }
  }

  // use this id field to generate UUIDs
  // id UUID PRIMARY KEY DEFAULT uuid_generate_v4()
  private async createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS coffees (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        description TEXT,
        price NUMERIC(10,2) NOT NULL,
        imageUrl TEXT NOT NULL,
        category TEXT NOT NULL
      );
    `;
    await this.query(sql);
  }
}
