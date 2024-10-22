import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { Public } from './decorators/public-route.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) { }

    
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // inicia a autenticação com Google
    }

    
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
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
