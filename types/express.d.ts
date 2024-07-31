import { IJwtUserData } from '../deleteme/_types/user.types';

declare module 'express' {
    interface Request {
        user?: IJwtUserData;
    }
}

export {};
