import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { EnvironmentService } from '../../environment/environment.service';
import { Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { FindUserByEmailQuery } from 'src/user/queries/find-user-by-email/find-user-by-email.query';
import { FindUserByEmailDto } from 'src/user/queries/find-user-by-email/find-user-by-email.dto';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        @Inject(EnvironmentService)
        private readonly environment: EnvironmentService,
        private readonly queryBus: QueryBus,
        @Inject(AuthService)
        private readonly authService: AuthService
    ) {
        super({
            clientID: environment.GOOGLE_CLIENT_ID,
            clientSecret: environment.GOOGLE_CLIENT_SECRET,
            callbackURL: environment.URL_CALLBACK_CODESPACE,
            scope: ['email', 'profile']
        })
    }

    //método que será executado na rota 
    //de callback após o google fornecer os parametros abaixo
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {

        const { displayName, emails, photos } = profile;
        
        //data retorna do login do google
        let responsePreData = {}

        const query = plainToClass(FindUserByEmailQuery, emails[0]);

        const user: FindUserByEmailDto = await this.queryBus.execute(query);

        if (!user) {
            responsePreData = {
                primaryAcess: true,
                data: {
                    name: displayName,
                    email: emails[0].value,
                    avatarUrl: photos[0].value,
                    token: ""
                }
            };

            //adicionará no request o objeto user, request.user
            done(null, responsePreData);
        }

        const tokens = await this.authService.signInWithGoogle({ email: user.email, id: user.id });

        responsePreData = {
            primaryAcess: false,
            data: {
                name: displayName,
                email: emails[0].value,
                avatarUrl: photos[0].value,
                accessToken: tokens.accessToken
            }
        }

        //adicionará no request o objeto user, request.user
        done(null, responsePreData);

    }
}