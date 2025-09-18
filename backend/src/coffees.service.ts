import { Injectable, ConflictException } from '@nestjs/common';
import { DbService } from './db.service';
import { CreateCoffeeItem, CoffeeItem } from './types';

@Injectable()
export class CoffeesService {
  constructor(private readonly db: DbService) {}

  async findAll(): Promise<CoffeeItem[]> {
    const res = await this.db.query(
      'SELECT id, title, description, price::float, imageurl, category FROM coffees ORDER BY id',
    );
    return res.rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      price: Number(r.price),
      imageUrl: r.imageurl || r.image_url || null,
      category: r.category,
    })) as CoffeeItem[];
  }

  async create(payload: CreateCoffeeItem): Promise<CoffeeItem> {
    const exists = await this.db.query(
      'SELECT id FROM coffees WHERE title = $1',
      [payload.title],
    );
    if (exists.rows.length > 0) {
      throw new ConflictException('Coffee with that title already exists');
    }

    const insert = await this.db.query(
      'INSERT INTO coffees(title, description, price, imageUrl, category) VALUES($1,$2,$3,$4,$5) RETURNING id, title, description, price::float, imageurl, category',
      [
        payload.title,
        payload.description ?? null,
        payload.price,
        payload.imageUrl,
        payload.category,
      ],
    );

    const row: any = insert.rows[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      price: Number(row.price),
      imageUrl: row.imageurl || row.image_url || null,
      category: row.category,
    } as CoffeeItem;
  }
}
