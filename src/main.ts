import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { limiter } from './config/policies/rate-limit.config';
import { corsConfig } from './config/policies/cors.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document); // Acesse a documentação em /doc

  //proteção contra ataque XSS e outros
  app.use(helmet());

  //proteção contra origens desconhecidas;
  app.enableCors(corsConfig);

  await app.listen(3001);
}
bootstrap();
