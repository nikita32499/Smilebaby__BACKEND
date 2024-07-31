import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { Roles } from '_decorators/Roles';
import { IOrder } from 'shared_SmileBaby/dist/types/order.types';
import { UserRole } from 'shared_SmileBaby/dist/types/user.types';
import { DtoOrderCreate, DtoOrderUpdate } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller({
    path: '/order',
})
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Roles('public')
    @Post('/create')
    async create(@Body() createOrder: DtoOrderCreate): Promise<IOrder | null> {
        return this.ordersService.create(createOrder);
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Get('/getAll')
    async getAll(): Promise<IOrder[]> {
        return this.ordersService.getAll();
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Get('/getById/:id')
    async getById(@Param('id', new ParseIntPipe()) id: number): Promise<IOrder | null> {
        return this.ordersService.getById(id);
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Patch('/update')
    async update(@Body() updateData: DtoOrderUpdate): TSuccessResponse {
        const success = await this.ordersService.update(updateData);
        return { success };
    }

    @Roles(UserRole.ADMIN, UserRole.MODERATOR)
    @Delete('/delete')
    async delete(@Body('id', new ParseIntPipe()) id: number): TSuccessResponse {
        const success = await this.ordersService.delete(id);
        return { success };
    }
}
