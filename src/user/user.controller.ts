import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { FindUserByEmailQuery } from './queries/find-user-by-email/find-user-by-email.query';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { CreateUserDto } from './commands/create-user/create-user.dto';
import { ERROR_MESSAGES } from 'src/constants/error-message.constants';
import { UpdateUserDto } from './commands/udpate-user/update-user.dto';
import { UpdateUserCommand } from './commands/udpate-user/update-user.command';
import { DeleteUserCommand } from './commands/delete-user/delete-user.command';

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
        dto: CreateUserDto
    ) {
        const command = plainToClass(CreateUserCommand, dto);

        const id = await this.commandBus.execute(command);

        if (!id) throw new NotFoundException(ERROR_MESSAGES.CANNOT_CREATE_USER);

        return id;
    }

    @UseGuards(JwtGuard)
    @Get("get-by-email/:email")
    async findOneUserByEmail(
        @Param('email')
        email: string
    ) {
        const query = plainToClass(FindUserByEmailQuery, { email });

        const user = await this.queryBus.execute(query);

        if (!user) throw new NotFoundException("User not found");

        return user;
    }

    @UseGuards(JwtGuard)
    @Patch(":id")
    async update(
        @Param('id', ParseUUIDPipe)
        id: string,
        @Body()
        dto: UpdateUserDto
    ) {

        const command = plainToClass(UpdateUserCommand, {
            ...dto,
            id
        });

        const result = await this.commandBus.execute(command);

        if (!result) throw new BadRequestException(ERROR_MESSAGES.BAD_REQUEST);

        return result
    }

    @UseGuards(JwtGuard)
    @Delete(":id")
    async delete(
        @Param('id', ParseUUIDPipe)
        id: string
    ) {

        const command = plainToClass(DeleteUserCommand, { id });

        const result = await this.commandBus.execute(command);

        if (!result) throw new BadRequestException(ERROR_MESSAGES.BAD_REQUEST);

        return result
    }
}
