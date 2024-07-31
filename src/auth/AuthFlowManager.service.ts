import { Injectable } from '@nestjs/common';
import { IJwtUserData } from 'shared_SmileBaby/dist/types/user.types';
import { UsersService } from 'user/users.service';
import { AuthService } from './auth.service';
import { IAuthFlowManager } from './types/AuthFlowManager.types';

@Injectable()
export class AuthFlowManager implements IAuthFlowManager {
    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService,
    ) {}

    async authorization(login: string, password: string) {
        const user = await this.userService.getByLogin(login);
        if (!user) return null;

        const passwordValidate = await this.authService.checkPassword(
            password,
            user.password,
        );
        if (!passwordValidate) return null;

        await this.userService.updateLastAt(user.id);
        const userData: IJwtUserData = {
            userId: user.id,
        };

        const token = await this.authService.createToken(userData);

        return { user, token };
    }
}
