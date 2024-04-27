import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
// somewhere in your initialization file

import dotenv from 'dotenv';
import 'src/_types/express.types';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(cookieParser());
  await app.listen(Number(process.env.NEST_PORT));
}
bootstrap();
