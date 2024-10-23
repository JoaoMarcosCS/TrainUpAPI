import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './environment/environment.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ EnvironmentModule, DatabaseModule, UserModule, AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
