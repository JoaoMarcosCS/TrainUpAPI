import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.create(createUserDto);
    }
}
