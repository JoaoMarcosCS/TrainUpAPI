import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentModule } from 'src/environment/environment.module';
import { EnvironmentService } from 'src/environment/environment.service';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: (env: EnvironmentService) => ({
        type: "postgres",
        logging: true,
        entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
        url: env.DATABASE_CONNECTION_STRING,
        synchronize: true
      }),
    }),
  ],

})

export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(@InjectDataSource() private dataSource: DataSource) { }

  async onModuleInit() {
    try {
      // Verifica se a conexão está estabelecida corretamente
      this.logger.log('Database connection established successfully!');

      // Loga as entidades carregadas
      const entities = this.dataSource.entityMetadatas.map((entity) => entity.name);
      this.logger.log(`Loaded entities: ${entities.join(', ')}`);
    } catch (error) {
      this.logger.error('Error during database initialization', error);
    }
  }
}
