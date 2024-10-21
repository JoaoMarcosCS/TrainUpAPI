import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

import { DataSource } from "typeorm";
import { InjectDataSource } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { plainToClass } from "class-transformer";
import { FindUserByEmailQuery } from "./find-user-by-email.query";
import { FindUserByEmailDto } from "./find-user-by-email.dto";

@QueryHandler(FindUserByEmailQuery)//especifica qual query esse handler vai tratar
//IQueryHandler< ClasseDosParametros, ClasseDeRetornoConsulta>
export class FindUserByEmailHandler implements IQueryHandler<FindUserByEmailQuery, FindUserByEmailDto | null>{
    
    constructor(
        @InjectDataSource()
        private readonly datasource: DataSource
    ){}
    
    async execute(query: FindUserByEmailQuery): Promise<FindUserByEmailDto | null> {
        
        const data = await this.datasource.manager.find(User, {
            where: {
                email: query.email
            }
        })

        //não há user com esse email
        if(!data.length) return null

        return plainToClass(FindUserByEmailDto, data[0]);
    }

}