/* eslint-disable @typescript-eslint/no-unsafe-call */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import { createClient } from 'redis';
import passport from 'passport';
import connectRedis from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(helmet());
  app.use(cookieParser());

  const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
      reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
    },
  });

  const logger = new Logger('Redis');
  redisClient.on('error', (err) => logger.error('Redis Client Error', err));
  redisClient.on('connect', () => logger.log('Redis connected successfully'));

  await redisClient.connect().catch((err) => logger.error('Could not connect to Redis', err));

  const RedisStore = connectRedis(session);
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'acmebank:',
    ttl: 86400, // 1 day
  });

  app.use(
    session({
      store: redisStore,
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`Server running at http://localhost:${port}`, 'Bootstrap');
}

void bootstrap();
