export const GLOBAL_RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000,
  max: parseInt(process.env.GLOBAL_RATE_LIMIT_MAX ?? '') || 100,
  keyGenerator: () => 'global',
  message: 'Too many requests, please try again later.',
};

export const PER_IP_RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000,
  max: parseInt(process.env.PER_IP_RATE_LIMIT_MAX ?? '') || 10,
  message: 'Too many requests from this IP, please try again later.',
};

export const PORT = process.env.PORT ?? 4040;
export const NODE_ENV = process.env.NODE_ENV ?? 'production';
