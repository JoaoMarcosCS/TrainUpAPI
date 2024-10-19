import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvironmentService } from "src/environment/environment.service";
import { AuthJWTPayload } from "../types/auth-jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        @Inject(EnvironmentService)
        private readonly environment: EnvironmentService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.JWT_SECRET
        })
    }

    async validate(payload: AuthJWTPayload) {
        
        return { id: payload.sub }
    }
}