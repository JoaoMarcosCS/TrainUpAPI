import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentModule } from './environment/environment.module';
import * as Joi from 'joi';

@Module({
  imports: [ EnvironmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
