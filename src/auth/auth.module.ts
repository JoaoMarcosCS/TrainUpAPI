import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { EnvironmentModule } from 'src/environment/environment.module';
import { PassportStrategy } from '@nestjs/passport';

@Module({
  imports: [UserModule, EnvironmentModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy]
})
export class AuthModule { }
