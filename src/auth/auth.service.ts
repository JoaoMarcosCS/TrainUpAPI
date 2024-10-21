import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJWTPayload } from './types/auth-jwt-payload';
import { EnvironmentService } from 'src/environment/environment.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly environment: EnvironmentService
    ) { }
    
    async signIn({email, id}) {
        const payload = { };
        console.log("\n\nEmail e id\n" + email + "\n\n\n" + id)
        const accessToken = await this.jwtService.sign({email, id});

        // const refreshToken = this.jwtService.sign(payload, {
        //     expiresIn: this.environment.REFRESH_JWT_EXPIRES,
        //      secret: this.environment.REFRESH_JWT_SECRET
        // });
        console.log("\n\nToken\n" + accessToken + "\n\n\n")

        return {
            // id: userId,
            accessToken,
            // refreshToken
        }
    }

    // async refresh(userId: number){
    //     const payload: AuthJWTPayload = { sub: userId };
    //     const refreshToken = this.jwtService.sign(payload);
    //     return {
    //         id: userId,
    //         refreshToken
    //     }
    // }
}
