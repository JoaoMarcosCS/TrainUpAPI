import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { EnvironmentService } from '../../environment/environment.service';
import { Inject } from '@nestjs/common';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        @Inject(EnvironmentService)
        private readonly environment: EnvironmentService,
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
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{

        const { displayName, emails, photos } = profile;
        
        const user: any = {
            email: emails[0].value,
            name: displayName,
            avatarUrl: photos[0].value,
        };

        //adicionará no request o objeto user, request.user
        done(null, user);

    }
}