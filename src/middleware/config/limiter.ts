import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Muitas tentativas de login, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
