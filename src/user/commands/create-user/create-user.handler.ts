import { ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "./create-user.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { User } from "src/entities/user.entity";

export class CreateUserHandler implements ICommandHandler<CreateUserCommand, string | null> {

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    async execute(command: CreateUserCommand): Promise<string | null> {

        return await this.dataSource.transaction(async (db) => {
            const user = db.create(User, command);

            await db.save(user);

            return user.id;
        })
    }

}