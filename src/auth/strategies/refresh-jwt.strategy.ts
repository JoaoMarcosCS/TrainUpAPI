import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EnvironmentService } from "src/environment/environment.service";
import { AuthJWTPayload } from "../types/auth-jwt-payload";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh-jwt') {

    constructor(
        @Inject(EnvironmentService)
        private readonly environment: EnvironmentService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: environment.REFRESH_JWT_SECRET
        })
    }

    async validate(payload: AuthJWTPayload) {
        
        return { id: payload.sub }
    }
}