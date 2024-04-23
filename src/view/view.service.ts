import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EnumViewNames } from '@src/_types/view';
import { ViewModel } from './view.model';

@Injectable()
export class ViewService {
  constructor(
    @InjectModel(ViewModel) private readonly View: typeof ViewModel,
  ) {}

  async saveView(name: EnumViewNames, payload: object, description: string) {
    JSON.stringify(payload);
    const result = await this.View.upsert({
      name,
      payload,
      description,
    });

    return result[0];
  }

  async getView(name: EnumViewNames) {
    return await this.View.findOne({
      where: {
        name,
      },
    });
  }

  async getAll() {
    return (await this.View.findAll()).sort((a, b) => a.id - b.id);
  }
}
