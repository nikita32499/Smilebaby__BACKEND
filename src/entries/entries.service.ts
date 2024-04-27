import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DtoEntryCreate } from './dto/create-entry.dto';
import { EntriesModel } from './entries.model';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(EntriesModel)
    private readonly Entry: Repository<EntriesModel>,
  ) {}

  async create(createData: DtoEntryCreate) {
    const newEntity = await this.Entry.create(createData);
    return await this.Entry.save(newEntity);
  }

  async getAll() {
    return await this.Entry.find();
  }

  async getById(id: number) {
    return await this.Entry.findOne({ where: { id } });
  }

  async update(id: number, updateData: DtoEntryCreate) {
    return await this.Entry.update(id, updateData);
  }

  async delete(id: number) {
    return await this.Entry.delete(id);
  }
}
