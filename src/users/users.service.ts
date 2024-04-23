import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IJwtUserData, isJwtUserData, IUser, UserRole } from '@src/_types/user';

import bcrypt from 'bcrypt';

import { DtoUserCreate, DtoUserUpdate, UserModel } from './users.model';

import jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private User: typeof UserModel) {}

  async getAll(): Promise<IUser[]> {
    return (await this.User.findAll()).sort((a, b) => a.id - b.id);
  }

  async getById(id: number): Promise<IUser | null> {
    return await this.User.findOne({
      where: { id },
    });
  }

  async create(createData: DtoUserCreate): Promise<IUser | Error> {
    const user = await this.User.findOne({
      where: {
        login: createData.login,
      },
    });

    if (user) return Error('Этот логин занят');

    const salt = await bcrypt.genSalt(12);

    createData.password = await bcrypt.hash(createData.password, salt);

    return await this.User.create({
      ...createData,
      role: createData.role ?? UserRole.USER,
    });
  }

  async update(id: number, updateData: DtoUserUpdate): Promise<IUser | null> {
    const user = await this.getById(id);
    if (!user) return null;
    await this.User.update(updateData, { where: { id } });

    return await this.getById(id);
  }

  async delete(id: number): Promise<IUser | null> {
    const user = await this.User.findByPk(id);

    if (!user || user.role === 'admin') return null;

    await user.destroy();

    return user;
  }

  async authorization(login: string, password: string) {
    const user = await this.User.findOne({ where: { login } });
    if (!user) return null;

    const passwordSuccess = await bcrypt.compare(password, user.password);
    if (!passwordSuccess) return null;

    await this.User.update(
      {
        lastAt: Date.now(),
      },
      {
        where: { id: user.id },
      },
    );

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
