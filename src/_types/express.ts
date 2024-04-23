import { IJwtUserData } from './user';

declare module 'express' {
  interface Request {
    user?: IJwtUserData;
  }
}

export {};
