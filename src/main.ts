import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
import { ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';

dotenv.config();

z.object({
    NEST_PORT: z.number(),
    JWT_SECRET_KEY: z.string(),
    DB_HOST: z.string(),
    DB_PORT: z.number(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_DATABASE: z.string(),
}).parse({
    ...process.env,
    NEST_PORT: parseInt(process.env['NEST_PORT']!),
    DB_PORT: parseInt(process.env['DB_PORT']!),
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');

    app.use(cookieParser());

    app.useGlobalPipes(new ZodValidationPipe());

    await app.listen(Number(process.env['NEST_PORT']));
}

bootstrap();

console.log('dddd');
