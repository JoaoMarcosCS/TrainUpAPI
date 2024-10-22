import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { DataSource } from "typeorm";
import { UpdateUserCommand } from "./update-user.command";

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand, boolean | null> {

    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    async execute(command: UpdateUserCommand): Promise<boolean> {
        return await this.dataSource.transaction(async (db) => {

            const user = await db.findOne(User, {
                where: {
                    id: command.id
                },
            })

            if (!user) return false;

            db.merge(User, user, command);

            await db.save(User, user);

            return true;
        })
    }

}