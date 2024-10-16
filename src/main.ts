import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { limiter } from './config/policies/rate-limit.config';
import { corsConfig } from './config/policies/cors.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document); // Acesse a documentação em /api

  //proteção contra ataque XSS e outros
  app.use(helmet());

  //proteção contra DDOS
  app.use(limiter);

  //proteção contra origens desconhecidas;
  app.enableCors(corsConfig);

  await app.listen(3001);
}
bootstrap();
