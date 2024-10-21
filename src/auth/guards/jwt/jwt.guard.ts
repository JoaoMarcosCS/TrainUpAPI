import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public-route.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    constructor(
        private reflector: Reflector,
    ) {
        super();
    }

    //validação para verifica se a tem o decorator da rota pública
    canActivate(context: ExecutionContext) {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getClass(),
            context.getHandler()
        ]);

        if (!isPublic) return false;

        return super.canActivate(context)

    }
}
