import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';

import { Reflector } from '@nestjs/core';
import { UsersService } from '@src/users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.headers.host?.includes('127.0.0.1')) return true;

    const token = request.cookies.authorization;

    if (token) {
      const user_data = this.userService.validateToken(token);
      if (user_data) {
        request.user = user_data;
      } else {
        response.clearCookie('authorization');
      }
    }

    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) ?? [];

    if (roles.includes('public')) return true;

    if (request.user && roles.includes(request.user.role)) return true;

    return false;
  }
}
