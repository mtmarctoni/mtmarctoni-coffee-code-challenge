import { Module } from '@nestjs/common';
import { AppController, HealthController } from './app.controller';
import { DbService } from './db.service';
import { CoffeesService } from './coffees.service';

@Module({
  imports: [],
  controllers: [AppController, HealthController],
  providers: [DbService, CoffeesService],
})
export class AppModule {}
