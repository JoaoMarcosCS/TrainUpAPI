import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
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
    // @Public()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // inicia a autenticação com Google
    }

    
    @Get('google/callback')
    // @Public()
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        // após o login bem-sucedido, é retornado o que está no return da strategy do google
        return req.user;
    }

    
    @Post("/signin")
    // @Public()
    async signIn(
        @Request() req
    ) {
        // return this.authService.signIn(req.user.id);
    }

    // @Public()
    // @UseGuards(RefreshJwtStrategy)
    // @Post("refresh")
    // async refreshToken(@Req() req) {
    //     return this.authService.refresh(req.user.id);
    // }
}
