import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';

import { AuthService } from 'auth/auth.service';
import { UsersService } from 'user/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private reflector: Reflector,
        private readonly userService: UsersService,
    ) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        if (request.ip?.includes('127.0.0.1')) return true;

        const roles = this.reflector.get<string[]>('roles', context.getHandler()) ?? [];

        if (roles.includes('public')) return true;

        const token: string | undefined = request.cookies['authorization'];

        if (!token) return false;

        const user_data = this.authService.validateToken(token);
        if (user_data) {
            request.user = user_data;
        } else {
            return false;
        }

        const userRole = this.userService.resolveRoleByUserId(user_data.userId);

        if (userRole && roles.includes(userRole)) return true;

        return false;
    }
}
