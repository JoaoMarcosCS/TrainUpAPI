import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from 'src/environment/environment.module';
import { EnvironmentService } from 'src/environment/environment.service';

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            imports:[EnvironmentModule],
            inject:[EnvironmentService],
            useFactory:(env: EnvironmentService) => ({
                type: "postgres",
                logging: true,
                entities: [__dirname + '../entities/*.entity{.ts,.js}'],
                url: env.DATABASE_CONNECTION_STRING
            }),
        }),
    ],

})
export class DatabaseModule {}
