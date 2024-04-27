import { IJwtUserData } from './user.types';

declare module 'express' {
  interface Request {
    user?: IJwtUserData;
  }
}

export {};
