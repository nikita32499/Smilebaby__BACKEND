import { Injectable, OnModuleInit } from '@nestjs/common';
import {
    IUser,
    IUserCreate,
    IUserUpdate,
    UserRole,
} from 'shared_SmileBaby/dist/types/user.types';

import { InjectRepository } from '@nestjs/typeorm';

import { AuthService } from 'auth/auth.service';
import { Repository } from 'typeorm';
import { IUserRepository } from './types/UserRepository.types';
import { UserModel } from './users.model';

@Injectable()
export class UsersService implements IUserRepository, OnModuleInit {
    private ListRoleByUserId: Record<number, UserRole>;
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(UserModel) private User: Repository<UserModel>,
    ) {
        this.ListRoleByUserId = {};
    }

    onModuleInit() {
        setInterval(async () => {
            try {
                const users = await this.getAll();

                this.ListRoleByUserId = users.reduce(
                    (acc, user) => {
                        acc[user.id] = user.role;
                        return acc;
                    },
                    {} as typeof this.ListRoleByUserId,
                );
            } catch (error) {
                console.error(error);
            }
        }, 10000);
    }

    resolveRoleByUserId(userId: number) {
        return this.ListRoleByUserId[userId] ?? null;
    }

    async getAll(): Promise<IUser[]> {
        return (await this.User.find()).sort((a, b) => a.id - b.id);
    }

    async getById(id: number) {
        return await this.User.findOne({
            where: { id },
        });
    }

    async getByLogin(login: string) {
        return await this.User.findOne({ where: { login } });
    }

    async create({ createData }: IUserCreate) {
        const user = await this.User.findOne({
            where: {
                login: createData.login,
            },
        });

        if (user) throw Error('Этот логин занят');

        createData.password = await this.authService.hashPassword(createData.password);

        const userEntry = await this.User.create({
            ...createData,
            role: createData.role ?? UserRole.USER,
        });
        return await this.User.save(userEntry);
    }

    async update(updatedUser: IUserUpdate) {
        type dd = Pretty<IUserUpdate>;
        const { id, update: updateData } = updatedUser;

        const user = await this.getById(id);
        if (!user) return false;
        await this.User.update(id, updateData);

        return true;
    }

    async updateLastAt(id: number) {
        await this.User.update(id, { lastAt: Date.now() });
    }

    async delete(id: number) {
        const user = await this.getById(id);

        if (!user || user.role === 'admin') return false;

        await this.User.delete(user.id);

        return true;
    }
}
