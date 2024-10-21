import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { FindUserByEmailQuery } from './queries/find-user-by-email/find-user-by-email.query';

@Controller('user')
export class UserController {

    constructor(private readonly queryBus: QueryBus) {

    }

    @Get("get-by-email")
    async findOneUserByEmail(
        @Param('email')
        email: string
    ) {
        const query = plainToClass(FindUserByEmailQuery, { email });

        //aqui o queryBus irá encontrar um handler associado a essa query
        const user = await this.queryBus.execute(query);

        if(!user) throw new NotFoundException("User not found");

        return user;
    }

}
