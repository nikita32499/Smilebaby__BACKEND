import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Roles } from '_decorators/Roles';
import { UserRole } from 'shared_SmileBaby/dist/types/user.types';
import { DtoItemCreate, DtoItemUpdate } from './dto/item.dto';
import { ItemsService } from './items.service';

@Controller({
    path: '/item',
})
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) {}

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Post('/create')
    create(@Body() createData: DtoItemCreate) {
        return this.itemsService.create(createData);
    }

    @Roles('public')
    @Get('/getAll')
    getAll() {
        return this.itemsService.getAll();
    }

    @Roles('public')
    @Get('/getById/:id')
    getById(@Param('id', new ParseIntPipe()) id: number) {
        return this.itemsService.getById(id);
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Post('/update')
    async update(@Body() updatedItem: DtoItemUpdate): Promise<TSuccessResponse> {
        const success = await this.itemsService.update(updatedItem);
        return { success };
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Delete('/delete')
    async delete(@Body('id', new ParseIntPipe()) id: number): Promise<TSuccessResponse> {
        const success = await this.itemsService.delete(+id);
        return { success };
    }
}
