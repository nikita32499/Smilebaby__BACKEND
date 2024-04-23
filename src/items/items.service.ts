import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EntriesModel } from '@src/entries/entries.model';
import { DtoItemCreate } from './dto/create-item.dto';
import { ItemModel } from './items.model';

@Injectable()
export class ItemsService implements OnModuleInit {
  constructor(
    @InjectModel(ItemModel) private readonly Item: typeof ItemModel,
    @InjectModel(EntriesModel) private readonly Entries: typeof EntriesModel,
  ) {}

  async onModuleInit() {
    // await this.Item.create({
    //   name: 'name',
    //   descriptions: 'descriptions',
    //   price: 5000,
    //   img_main: 'img_main',
    //   img_prev: ['img_prev'],
    //   url: 'url',
    //   amount: [],
    // });

    setTimeout(async () => {
      await this.Item.create(
        {
          name: 'name',
          descriptions: 'descriptions',
          price: 5000,
          img_main: 'img_main',
          img_prev: ['img_prev'],
          url: 'url' + Math.random().toString(),
          amount: [],
          // если вы хотите создать запись без lastAt, иначе укажите соответствующее значение
          entryId1: 1,
          entryId2: 3,
        } as any,
        {
          include: [
            {
              model: this.Entries,
              as: 'entry1', // Название ассоциации, с которой связана запись // Вы можете указать `true`, если эта связь обязательна
            },
            {
              model: this.Entries,
              as: 'entry2',
            },
          ],
        },
      );
    }, 10000);
  }

  async create(createData: DtoItemCreate) {
    console.log(createData);
    // const newItem = new this.Item();
    // console.log(createData, newItem);
    // Object.assign(newItem.price, createData);
    // newItem.season=
  }

  async getAll() {
    return await this.Item.findAll({
      include: [
        {
          model: this.Entries,
          as: 'entry1',
        },
        {
          model: this.Entries,
          as: 'entry2',
        },
      ],
    });
  }

  async getById(id: number) {
    return await this.Item.findByPk(id);
  }

  async remove(id: number) {
    return await this.Item.destroy({ where: { id } });
  }

  // update(id: number, updateItemDto: UpdateItemDto) {
  //   return `This action updates a #${id} item`;
  // }
}
