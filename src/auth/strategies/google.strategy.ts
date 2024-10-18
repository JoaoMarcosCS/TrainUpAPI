import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { EnvironmentService } from '../../environment/environment.service';
import { Inject } from '@nestjs/common';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly authService: AuthService,
        @Inject(EnvironmentService) private readonly environment: EnvironmentService,
    ) {
        super({
            clientID: environment.GOOGLE_CLIENT_ID,
            clientSecret: environment.GOOGLE_CLIENT_SECRET,
            callbackURL: environment.URL_CALLBACK_CODESPACE,
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{

        const { googleId, displayName, emails, photos } = profile;
        console.log("\n Profile google received\n " + JSON.stringify(profile) + "\n End of profile received\n\n");
        const user: any = {
            googleId: googleId,
            email: emails[0].value,
            name: displayName,
            avatarUrl: photos[0].value,
            accessToken,

        };

        done(null, user);

    }
}