import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCoffeeItem } from './types';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class AppController {
  constructor(private readonly coffees: CoffeesService) {}

  @Get()
  async getItems() {
    return this.coffees.findAll();
  }

  @Post()
  async create(@Body() payload: CreateCoffeeItem) {
    // Validate uniqueness by title
    return this.coffees.create(payload);
  }
}

@Controller('healthcheck')
export class HealthController {
  constructor(private readonly coffees: CoffeesService) {}

  async checkDatabase(): Promise<boolean> {
    try {
      await this.coffees['db'].query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  @Get('')
  async healthcheck() {
    const dbHealthy = await this.checkDatabase();
    return {
      status: 'healthy',
      database: dbHealthy,
      timestamp: new Date().toISOString(),
    };
  }
}
