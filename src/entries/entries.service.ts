import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DtoEntryCreate } from './dto/create-entry.dto';
import { EntriesModel } from './entries.model';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(EntriesModel) private readonly Entry: typeof EntriesModel,
  ) {}

  async create(createData: DtoEntryCreate) {
    return await this.Entry.create(createData);
  }

  async getAll() {
    return await this.Entry.findAll();
  }

  async getById(id: number) {
    return await this.Entry.findByPk(id);
  }

  async update(id: number, updateData: DtoEntryCreate) {
    return await this.Entry.update(updateData, { where: { id } });
  }

  async remove(id: number) {
    return await this.Entry.destroy({ where: { id } });
  }
}
