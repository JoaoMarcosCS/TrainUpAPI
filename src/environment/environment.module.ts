import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { ConfigModule } from '@nestjs/config';
import { environmentSchema } from './environment.schema';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: environmentSchema,
    })],
    providers: [EnvironmentService],
    exports: [EnvironmentService]
})
export class EnvironmentModule { }
