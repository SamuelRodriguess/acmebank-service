/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import csurf from 'csurf';
import { RequestHandler } from 'express';

export const csrfMiddleware: RequestHandler = csurf({
  cookie: { httpOnly: true, sameSite: 'lax' },
});
