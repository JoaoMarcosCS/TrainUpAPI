import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { FindUserByEmailQuery } from './queries/find-user-by-email/find-user-by-email.query';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus
    ) {
    }

    @Post()
    async cretae(
        @Body()
        dto: CreateUserDto// já válida o dto antes de chegar na função
    ) {
        const command = plainToClass(CreateUserDto, dto);

        const id = await this.commandBus.execute(command);

        if(!id) throw new NotFoundException("User ")
    }

    @UseGuards(JwtGuard)
    @Get("get-by-email/:email")
    async findOneUserByEmail(
        @Param('email')
        email: string
    ) {
        const query = plainToClass(FindUserByEmailQuery, email);

        //aqui o queryBus irá encontrar um handler associado a essa query
        const user = await this.queryBus.execute(query);

        if (!user) throw new NotFoundException("User not found");

        return user;
    }

}
