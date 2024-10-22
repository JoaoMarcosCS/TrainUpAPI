import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { plainToClass } from "class-transformer";
import { FindUserByEmailQuery } from "./find-user-by-email.query";
import { FindUserByEmailDto } from "./find-user-by-email.dto";

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery, FindUserByEmailDto | null>{
    
    constructor(
        @InjectDataSource()
        private readonly datasource: DataSource
    ){}
    
    async execute(query: FindUserByEmailQuery): Promise<FindUserByEmailDto | null> {
        
        const data = await this.datasource.manager.findOne(User, {
            where: {
                email: query.email
            }
        })

        if(!data) return null

        return plainToClass(FindUserByEmailDto, data);
    }

}