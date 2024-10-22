import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { EnvironmentService } from '../../environment/environment.service';
import { Inject } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { FindUserByEmailQuery } from 'src/user/queries/find-user-by-email/find-user-by-email.query';

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

        const query = plainToClass(FindUserByEmailQuery, emails[0]);

        let action = {}
        //validar se existe um user com esse email
        const user = await this.queryBus.execute(query);

        //se naõ existir, manda uma flag no response pedindo para se cadastrar
        if (!user) {

            action = {
                primaryAcess: true,
                data: {
                    name: displayName,
                    email: emails[0].value,
                    avatarUrl: photos[0].value,
                    token: ""
                }
            };

            //adicionará no request o objeto user, request.user
            done(null, action);
        }
        
        //se existir, gera um JWT com as informações
        const token = this.authService.signIn({ email: user.email, id: user.id });
        
        action = {
            primaryAcess: false,
                data: {
                    name: displayName,
                    email: emails[0].value,
                    avatarUrl: photos[0].value,
                    token: token
                }
        }

        //adicionará no request o objeto user, request.user
        done(null, action);

    }
}