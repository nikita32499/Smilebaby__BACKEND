import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumViewNames } from '@src/_types/view.types';
import { Repository } from 'typeorm';
import { ViewModel } from './view.model';

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(ViewModel) private View: Repository<ViewModel>,
  ) {}

  async saveView(name: EnumViewNames, payload: object, description: string) {
    JSON.stringify(payload);

    await this.View.upsert(
      {
        name,
        payload,
        description,
      },
      ['name'],
    );
    return await this.getView(name);
  }

  async getView(name: EnumViewNames) {
    return await this.View.findOne({
      where: {
        name,
      },
    });
  }

  async getAll() {
    return (await this.View.find()).sort((a, b) => a.id - b.id);
  }
}
