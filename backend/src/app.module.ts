import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController, HealthController } from './app.controller';
import { DbService } from './db.service';
import { CoffeesService } from './coffees.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [DbService, CoffeesService],
})
export class AppModule {}
