import { Body, Controller, Get, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OauthGoogleGuard } from './guards/oauth-google/oauth-google.guard';
import { CommandBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { ERROR_MESSAGES } from 'src/constants/error-message.constants';
import { CreateUserCommand } from 'src/user/commands/create-user/create-user.command';
import { CreateUserDto } from 'src/user/commands/create-user/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly commandBus: CommandBus
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

    
    @Post("signin")
    async signIn(
        @Body() 
        body: {email, password}
    ) {
        return await this.authService.signInWithPassword(body);
    }

   
    @Post('signup')
    async cretae(
        @Body()
        dto: CreateUserDto
    ) {
        const command = plainToClass(CreateUserCommand, dto);

        const id = await this.commandBus.execute(command);

        if (!id) throw new NotFoundException(ERROR_MESSAGES.CANNOT_CREATE_USER);

        return id;
    }

}
