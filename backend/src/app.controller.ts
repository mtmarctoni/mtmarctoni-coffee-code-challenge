import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
