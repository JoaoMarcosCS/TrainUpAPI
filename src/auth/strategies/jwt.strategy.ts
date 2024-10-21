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
            //de onde vamos extrair da requisição o JWT
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            //para validar o jwt vindo da requisição com a mesma chave secreta
            secretOrKey: environment.JWT_SECRET,

            //validar se o jwt está expirdado ou não
            ignoreExpiration: false,
        })
    }

    //implementação do método de validação adicional após o jwt já ter sido validado
    //no método super
    async validate(payload: any) {

        return { id: payload.sub }// esse objeto estará disponível no request.user
    }
}