import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DtoOrderCreate } from './dto/create-order.dto';
import { OrderModel } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderModel) private readonly Order: typeof OrderModel,
  ) {}

  async create(createData: DtoOrderCreate) {
    return await this.Order.create(createData);
  }

  async getAll() {
    return await this.Order.findAll();
  }

  async getById(id: number) {
    return await this.Order.findByPk(id);
  }

  async update(id: number, updateData: DtoOrderCreate) {
    return await this.Order.update(updateData, { where: { id } });
  }

  async remove(id: number) {
    return await this.Order.destroy({ where: { id } });
  }
}
