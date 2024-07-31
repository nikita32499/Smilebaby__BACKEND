import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SchemaJwtUserData } from 'shared_SmileBaby/dist/contract/user.contract';
import { IJwtUserData } from 'shared_SmileBaby/dist/types/user.types';
import { IAuthRepository } from './types/AuthRepository.types';
@Injectable()
export class AuthService implements IAuthRepository {
    constructor() {}

    async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(12);

        return await bcrypt.hash(password, salt);
    }

    async checkPassword(password: string, hashPassword: string) {
        return await bcrypt.compare(password, hashPassword);
    }

    async createToken(payload: IJwtUserData): Promise<string> {
        const token = jwt.sign(payload, process.env['JWT_SECRET_KEY']!, {
            algorithm: 'HS512',
            expiresIn: '7d',
        });
        return token;
    }

    validateToken(token: string): IJwtUserData | false {
        const payload = jwt.verify(token, process.env['JWT_SECRET_KEY']!);
        const result = SchemaJwtUserData.safeParse(payload);

        if (!result.success) return false;
        return result.data;
    }
}
