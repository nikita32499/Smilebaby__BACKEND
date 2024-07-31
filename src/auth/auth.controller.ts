import {
    Body,
    Controller,
    Post,
    Res,
    UnauthorizedException,
    ValidationPipe,
} from '@nestjs/common';
import { Roles } from '_decorators/Roles';
import { Response } from 'express';
import { AuthFlowManager } from './AuthFlowManager.service';
import { AuthService } from './auth.service';
import { DtoUserAuth } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly authManager: AuthFlowManager,
    ) {}

    @Roles('public')
    @Post('/login')
    async login(
        @Body() { login, password }: DtoUserAuth,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authManager.authorization(login, password);

        if (!result) throw new UnauthorizedException('Неправильный логин или пароль');

        response.cookie('authorization', result.token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            secure: true,
            sameSite: 'strict',
        });
        response.json(result.user);
        response.end();
    }

    @Roles('public')
    @Post('/validateToken')
    async validateToken(@Body('token', new ValidationPipe()) token: string) {
        return await this.authService.validateToken(token);
    }
}
