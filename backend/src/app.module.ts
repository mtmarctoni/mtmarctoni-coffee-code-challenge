import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DbService } from './db.service';
import { CoffeesService } from './coffees.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [DbService, CoffeesService],
})
export class AppModule {}
