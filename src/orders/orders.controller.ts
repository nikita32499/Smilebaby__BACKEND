import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DtoOrderCreate } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller({
  path: '/orders',
})
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  async create(@Body() createOrderDto: DtoOrderCreate) {
    return this.ordersService.create(createOrderDto);
  }

  @Get('/getAll')
  async getAll() {
    return this.ordersService.getAll();
  }

  @Get('/getById')
  async getById(@Param('id') id: number) {
    return this.ordersService.getById(id);
  }

  @Patch('/update')
  async update(@Param('id') id: number, @Body() updateData: DtoOrderCreate) {
    return this.ordersService.update(id, updateData);
  }

  @Delete('/delete')
  async delete(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
