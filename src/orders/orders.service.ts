import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DtoOrderCreate, DtoOrderUpdate } from './dto/create-order.dto';
import { OrderModel } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderModel)
    private readonly Order: Repository<OrderModel>,
  ) {}

  async create(createData: DtoOrderCreate) {
    return await this.Order.create(createData);
  }

  async getAll() {
    return await this.Order.find();
  }

  async getById(id: number) {
    return await this.Order.findOne({ where: { id } });
  }

  async update(id: number, updateData: DtoOrderUpdate) {
    await this.Order.update(id, updateData);
    return await this.getById(id);
  }

  async delete(id: number) {
    return await this.Order.delete(id);
  }
}
