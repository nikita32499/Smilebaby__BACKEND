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
import { IOrder } from '@src/_types/orders.types';
import { DtoOrderCreate, DtoOrderUpdate } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller({
  path: '/orders',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  async create(@Body() createOrderDto: DtoOrderCreate): Promise<IOrder | null> {
    return this.ordersService.create(createOrderDto);
  }

  @Get('/getAll')
  async getAll(): Promise<IOrder[]> {
    return this.ordersService.getAll();
  }

  @Get('/getById')
  async getById(
    @Query('id', new ParseIntPipe()) id: number,
  ): Promise<IOrder | null> {
    return this.ordersService.getById(id);
  }

  @Patch('/update')
  async update(
    @Body('id', new ParseIntPipe()) id: number,
    @Body('data') updateData: DtoOrderUpdate,
  ): Promise<IOrder | null> {
    return this.ordersService.update(id, updateData);
  }

  @Delete('/delete')
  async delete(@Body('id', new ParseIntPipe()) id: number) {
    return this.ordersService.delete(id);
  }
}
