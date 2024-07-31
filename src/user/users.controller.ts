import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { Roles } from '_decorators/Roles';
import { IUser, UserRole } from 'shared_SmileBaby/dist/types/user.types';
import { DtoUserCreate, DtoUserUpdate } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller({
    path: '/user',
})
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Roles(UserRole.ADMIN)
    @Get('/getAll')
    async getAll(): Promise<IUser[]> {
        return await this.usersService.getAll();
    }

    @Roles(UserRole.ADMIN)
    @Get('/getById/:id')
    async getById(@Param('id', new ParseIntPipe()) id: number): Promise<IUser | null> {
        return await this.usersService.getById(id);
    }

    @Roles(UserRole.ADMIN)
    @Post('/update')
    async update(@Body() updatedUser: DtoUserUpdate): TSuccessResponse {
        type dd = Pretty<DtoUserUpdate>;
        const success = await this.usersService.update(updatedUser);
        if (!success) throw new BadRequestException('Пользователь не найден');
        return { success };
    }

    @Roles(UserRole.ADMIN)
    @Post('/create')
    async create(@Body() createData: DtoUserCreate): Promise<IUser> {
        let user: IUser;
        try {
            user = await this.usersService.create(createData);
        } catch (error) {
            throw new BadRequestException((error as Error).message);
        }
        return user;
    }

    @Roles(UserRole.ADMIN)
    @Delete('/delete')
    async delete(@Body('id', new ParseIntPipe()) id: number): TSuccessResponse {
        const success = await this.usersService.delete(id);
        if (!success) throw new BadRequestException('Пользователь не найден');
        return { success };
    }
}
