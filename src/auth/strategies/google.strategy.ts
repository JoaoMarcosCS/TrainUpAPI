import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { EnvironmentService } from 'src/environment/environment.service';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private readonly authServie: AuthService, private readonly environment: EnvironmentService){
        super({
           clientId: environment.GOOGLE_CLIENT_ID,
            clientSecret: environment.GOOGLE_CLIENT_SECRET,
            callbackURL: environment.URL_CALLBACK_LOCAL,
            scope: ['email', 'profile']
        })

        async validator(){}
    }
}