/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import path, { join } from 'path';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { createClient } from 'redis';
const { RedisStore } = require('connect-redis');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));

  app.setBaseViewsDir(join(path.resolve(__dirname, '../'), 'views'));

  app.set('view engine', 'ejs');

  app.use(helmet());
  app.use(cookieParser());

  const redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  await redisClient.connect();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: ':',
  });

  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET || 'seusegredo',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true },
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();
