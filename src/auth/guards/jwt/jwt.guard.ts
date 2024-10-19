import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public-route.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt'){
    constructor(
        private reflector: Reflector,
    ){
        super();
    }

    //verifica se a tora é publica
    canActivate(context: ExecutionContext){
        
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
            context.getClass(),
            context.getHandler()
        ]);

        if(!isPublic) return false;

        return super.canActivate(context)

    }
}
