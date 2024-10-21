import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports:[TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [UserController],
  providers: [UserService, ...QueryHandlers, ...CommandHandlers],
  exports:[UserService, ...QueryHandlers, ...CommandHandlers]
})
export class UserModule {}
