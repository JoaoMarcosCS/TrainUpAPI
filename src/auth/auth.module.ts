import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports:[UserModule, GoogleStrategy],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
