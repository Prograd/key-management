/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const confi = new DocumentBuilder()
    .setTitle('NestJS')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const document = SwaggerModule.createDocument(app, confi);
  SwaggerModule.setup('docs', app, document, {});

  const port = process.env.PORT || 3333;
  await app.listen(port);
}

bootstrap();
