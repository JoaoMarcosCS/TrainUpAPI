import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EnvironmentService } from 'src/environment/environment.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { FindUserByEmailQuery } from 'src/user/queries/find-user-by-email/find-user-by-email.query';
import { comparePassword } from 'src/utils/compare-password.utils';
import { FindUserByEmailDto } from 'src/user/queries/find-user-by-email/find-user-by-email.dto';
import { ERROR_MESSAGES } from 'src/constants/error-message.constants';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly environment: EnvironmentService,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly queryBus: QueryBus
    ) { }
    
    async signInWithGoogle({email, id}) {
        
        const accessToken = await this.jwtService.sign({email, id});

        return {
            accessToken,
        }
    }

    async signInWithPassword({ email, password}){

        const query = plainToClass(FindUserByEmailQuery, email);
        const user: FindUserByEmailDto = await this.queryBus.execute(query);

        if(!user) throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);

        const isCorrectPassword = await comparePassword(password, user.password);

        if(!isCorrectPassword) throw new BadRequestException(ERROR_MESSAGES.INCORRECT_PASSWORD)

        const payload = {
            email: user.email,
            id: user.id,
        }

        const token = await this.jwtService.sign({...payload, type: "accesss"});

    }

    
}
