import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

import { AppModule } from './app.module';
import { ValidationException } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
