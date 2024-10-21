import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentService } from 'src/environment/environment.service';
import { EnvironmentModule } from 'src/environment/environment.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { QueryHandlers } from 'src/user/queries';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    UserModule,
    EnvironmentModule,
    CqrsModule,
    ...QueryHandlers,
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (environment: EnvironmentService) => ({
        secret: environment.JWT_SECRET,
        signOptions: {
          expiresIn: environment.JWT_EXPIRES
        },
      }),
    }),
  ],
  exports: [JwtStrategy, AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    // {
    //   provide: APP_GUARD, //todas as rotas se tornam autenticadas com essa config
    //   useClass: JwtGuard // método usado para autenticar as rotas
    // }
  ],
})
export class AuthModule { }
