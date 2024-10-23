import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public-route.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    constructor(
    ) {
        super();
    }

}
