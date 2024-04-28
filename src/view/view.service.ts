import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnumViewNames } from '@src/_types/view.types';
import { Repository } from 'typeorm';
import { DtoView } from './dto/HOME.dto';
import { ViewModel } from './view.model';

@Injectable()
export class ViewService {
  constructor(
    @InjectRepository(ViewModel) private View: Repository<ViewModel>,
  ) {}

  async saveView(createData: DtoView) {
    JSON.stringify(createData);

    await this.View.upsert(
      {
        name: createData.name,
        payload: createData.payload,
        description: createData.description,
      },
      ['name'],
    );
    return await this.getView(createData.name);
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
