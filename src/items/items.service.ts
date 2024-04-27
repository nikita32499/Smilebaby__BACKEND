import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DtoItemCreate, DtoItemUpdate } from './dto/create-item.dto';
import { ItemModel } from './items.model';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemModel)
    private readonly Item: Repository<ItemModel>,
  ) {}

  async create(createData: DtoItemCreate) {
    console.log(createData);
    const newItem = await this.Item.create(createData);
    return await this.Item.save(newItem);
  }

  async getAll() {
    return await this.Item.find();
  }

  async getById(id: number) {
    return await this.Item.findOne({ where: { id } });
  }

  async delete(id: number) {
    return await this.Item.delete(id);
  }

  async update(id: number, updateData: DtoItemUpdate) {
    await this.Item.update(id, updateData);
    return await this.getById(id);
  }
}
