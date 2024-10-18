import { v4 as uuidv4 } from 'uuid';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { EnvironmentService } from '../../environment/environment.service';
import { ProfileGoogle } from '../types/user-profile.type';
import { Inject } from '@nestjs/common';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly authService: AuthService,
        @Inject(EnvironmentService) private readonly environment: EnvironmentService,
    ) {
 
        super({
            clientID: environment.GOOGLE_CLIENT_ID,
            clientSecret: environment.GOOGLE_CLIENT_SECRET,
            callbackURL: environment.URL_CALLBACK_LOCAL,
            scope: ['email', 'profile']
        })
    }

    async validator(profile: ProfileGoogle, done: VerifyCallback) {

        const { googleId, displayName, emails, photos }: ProfileGoogle = profile;

        const user: any = {
            googleId: googleId,
            email: emails[0].value,
            name: displayName,
            avatarUrl: photos[0].value,
        };

        // const validatedUser = await this.authService.verifyOrCreateUser(user);
        done(null, user);

    }
}