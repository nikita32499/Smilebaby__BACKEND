import { Injectable } from '@nestjs/common';
import {
  IJwtUserData,
  isJwtUserData,
  IUser,
  UserRole,
} from '@src/_types/user.types';

import bcrypt from 'bcrypt';

import { DtoUserCreate, DtoUserUpdate, UserModel } from './users.model';

import { InjectRepository } from '@nestjs/typeorm';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private User: Repository<UserModel>,
  ) {}

  async getAll(): Promise<IUser[]> {
    return (await this.User.find()).sort((a, b) => a.id - b.id);
  }

  async getById(id: number) {
    return await this.User.findOne({
      where: { id },
    });
  }

  async create(createData: DtoUserCreate) {
    const user = await this.User.findOne({
      where: {
        login: createData.login,
      },
    });

    if (user) return Error('Этот логин занят');

    const salt = await bcrypt.genSalt(12);

    createData.password = await bcrypt.hash(createData.password, salt);

    const userEntry = await this.User.create({
      ...createData,
      role: createData.role ?? UserRole.USER,
    });
    return await this.User.save(userEntry);
  }

  async update(id: number, updateData: DtoUserUpdate) {
    const user = await this.getById(id);
    if (!user) return null;
    await this.User.update(id, updateData);

    return await this.getById(id);
  }

  async delete(id: number) {
    const user = await this.getById(id);

    if (!user || user.role === 'admin') return null;

    await this.User.delete(user.id);

    return user;
  }

  async authorization(login: string, password: string) {
    const user = await this.User.findOne({ where: { login } });
    if (!user) return null;

    const passwordSuccess = await bcrypt.compare(password, user.password);
    if (!passwordSuccess) return null;

    await this.User.update(user.id, {
      lastAt: Date.now(),
    });

    return user;
  }

  createToken(payload: IJwtUserData): string {
    if (!(payload instanceof Object))
      throw new Error('JwtData должен быть объектом');
    return jwt.sign(payload, process.env.JWT_SECRET_KEY!, {
      algorithm: 'HS512',
      expiresIn: '7d',
    });
  }

  validateToken(token: string): IJwtUserData | false {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      if (typeof payload === 'object') {
        delete payload.exp;
        delete payload.iat;
        if (isJwtUserData(payload)) {
          return payload;
        }
      }
    } catch (error) {}
    return false;
  }
}
