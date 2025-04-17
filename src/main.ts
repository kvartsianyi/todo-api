import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidationException } from '@common/exceptions';
import { HttpExceptionsFilter } from '@common/filters';
import { DOCUMENT_CONFIG } from '@common/swagger/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionsFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        exposeDefaultValues: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new ValidationException(validationErrors),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(DOCUMENT_CONFIG.TITLE)
    .setDescription(DOCUMENT_CONFIG.DESCRIPTION)
    .setVersion(DOCUMENT_CONFIG.VERSION)
    .addTag(DOCUMENT_CONFIG.TAG)
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(DOCUMENT_CONFIG.PATH, app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
