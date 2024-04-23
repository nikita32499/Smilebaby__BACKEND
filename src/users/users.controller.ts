import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Roles } from '@src/_decorators/Roles';
import { IUserJwtData } from '@src/_types/user';
import { Response } from 'express';
import { DtoUserCreate, DtoUserUpdate } from './users.model';
import { UsersService } from './users.service';

@Controller({
  path: '/users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //
  @Roles('admin')
  @Get('/getAll')
  async getAll() {
    return await this.usersService.getAll();
  }

  @Roles('admin')
  @Get('/getById')
  async getById(@Query('id', new ParseIntPipe()) id: number) {
    return await this.usersService.getById(id);
  }

  @Roles('admin')
  @Post('/update')
  async update(
    @Body('id', new ParseIntPipe()) id: number,
    @Body('data') updateData: DtoUserUpdate,
  ) {
    const user = await this.usersService.update(id, updateData);
    if (!user) throw new BadRequestException('Пользователь не найден');
    return user;
  }

  @Roles('admin')
  @Post('/create')
  async create(@Body() createData: DtoUserCreate) {
    const user = await this.usersService.create(createData);
    if (user instanceof Error) throw new BadRequestException(user.message);
    return user;
  }

  @Roles('admin')
  @Delete('/delete')
  async delete(@Body('id', new ParseIntPipe()) id: number) {
    const user = await this.usersService.delete(id);
    if (!user) throw new BadRequestException('Пользователь не найден');
    return user;
  }

  @Roles('public')
  @Post('/login')
  async login(
    @Body('login') login: string,
    @Body('password') password: string,
    @Res() response: Response,
  ) {
    const user = await this.usersService.authorization(login, password);

    if (!user) throw new BadRequestException('Неправильный логин или пароль');

    const userData: IUserJwtData = {
      userId: user.id,
      role: user.role,
    };

    const token = this.usersService.createToken(userData);

    response.cookie('authorization', token);
    response.json(userData);
    response.end();
  }

  @Roles('public')
  @Post('/validateToken')
  async validateToken(@Body('token') token: string) {
    return await this.usersService.validateToken(token);
  }
}
