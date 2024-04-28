import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Roles } from '@src/_decorators/Roles';
import { IOrder } from '@src/_types/orders.types';
import { UserRole } from '@src/_types/user.types';
import { DtoOrderCreate, DtoOrderUpdate } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller({
  path: '/orders',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('public')
  @Post('/create')
  async create(@Body() createOrderDto: DtoOrderCreate): Promise<IOrder | null> {
    return this.ordersService.create(createOrderDto);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Get('/getAll')
  async getAll(): Promise<IOrder[]> {
    return this.ordersService.getAll();
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Get('/getById')
  async getById(
    @Query('id', new ParseIntPipe()) id: number,
  ): Promise<IOrder | null> {
    return this.ordersService.getById(id);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Patch('/update')
  async update(
    @Body('id', new ParseIntPipe()) id: number,
    @Body('data') updateData: DtoOrderUpdate,
  ): Promise<IOrder | null> {
    return this.ordersService.update(id, updateData);
  }

  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @Delete('/delete')
  async delete(@Body('id', new ParseIntPipe()) id: number) {
    return this.ordersService.delete(id);
  }
}
