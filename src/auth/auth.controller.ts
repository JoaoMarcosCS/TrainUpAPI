import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { Public } from './decorators/public-route.decorator';
import { OauthGoogleGuard } from './guards/oauth-google/oauth-google.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    
    @Get('google')
    @UseGuards(OauthGoogleGuard)
    async googleAuth(@Req() req) {
        // inicia a autenticação com Google
    }

    
    @Get('google/callback')
    @UseGuards(OauthGoogleGuard)
    async googleAuthRedirect(@Req() req) {
        // após o login bem-sucedido, é retornado o que está no return da strategy do google
        return req.user;
    }

    
    @Post("/signin")
    async signIn(
        @Body() 
        body: {email, password}
    ) {
        return await this.authService.signInWithPassword(body);
    }
}
