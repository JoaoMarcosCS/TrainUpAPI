import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteUserCommand } from "./delete-user.command";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { User } from "src/entities/user.entity";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand, boolean | null>{
    
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ){}
    
    async execute(command: DeleteUserCommand): Promise<boolean> {

        return await this.dataSource.transaction(async (db) => {
            const user = await db.findOne(User, {
                where: {
                    id: command.id
                }
            })

            if(!user) return false;

            const result = await db.delete(User, { id: user.id });

            return result.affected > 0; //true se alguma linha foi afetada, false se nao foi

        })
    }

}