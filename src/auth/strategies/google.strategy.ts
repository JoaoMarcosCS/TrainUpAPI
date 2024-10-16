import { v4 as uuidv4 } from 'uuid';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { EnvironmentService } from '../../environment/environment.service';
import { ProfileGoogle } from '../types/user-profile.type';
import { Gender } from 'src/enums/gender.enum';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(private readonly authService: AuthService, private readonly environment: EnvironmentService) {
        super({
            clientId: environment.GOOGLE_CLIENT_ID,
            clientSecret: environment.GOOGLE_CLIENT_SECRET,
            callbackURL: environment.URL_CALLBACK_LOCAL,
            scope: ['email', 'profile']
        })
    }

    async validator(profile: ProfileGoogle, done: VerifyCallback) {

        const { googleId, displayName, emails, photos }: ProfileGoogle = profile;

        const user: CreateUserDto= {
            googleId: googleId,
            email: emails[0].value,
            name: displayName,
            avatarUrl: photos[0].value,
            password: '', 
            height: 0, 
            weight: 0, 
            gender: Gender.OTHER, 
            birthday: new Date(), 
            about: 'Nada escrito ainda :(',
        };

        const validatedUser = await this.authService.validateOAuthUser(user);
        done(null, validatedUser);

    }
}