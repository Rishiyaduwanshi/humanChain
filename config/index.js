import { AppError } from "../src/utils/appError.js";

export const GLOBAL_RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000,
  max: parseInt(process.env.GLOBAL_RATE_LIMIT_MAX || '100'), keyGenerator: () => 'global',
  handler: (_, res) => {
    throw new AppError({
      message: 'Too many requests, please try again later.',  
      statusCode: 429,
    })
  },
};

export const PER_IP_RATE_LIMIT_CONFIG = {
  windowMs: 60 * 1000,
  max: parseInt(process.env.PER_IP_RATE_LIMIT_MAX ?? '') || 10,
  handler: (_, res) => {
    throw new AppError({
      message: 'Too many requests from this IP, please try again later.',
      statusCode: 429,
    });
  },
};

export const PORT = process.env.PORT ?? 4040;
export const NODE_ENV = process.env.NODE_ENV ?? 'development';
export const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/humanChain'
