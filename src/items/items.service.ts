import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { IItemCreate, IItemCreate } from 'shared_SmileBaby/dist/types/items.types';

import { createSlug } from '_helpers/slug';
import { isUpdateSuccess } from '_helpers/typeOrm';
import { IItemCreate, IItemUpdate } from 'shared_SmileBaby/dist/types/item.types';
import { Repository } from 'typeorm';
import { ItemModel } from './items.model';
import { IItemRepository } from './types/ItemRepository.types';

@Injectable()
export class ItemsService implements IItemRepository {
    constructor(
        @InjectRepository(ItemModel)
        private readonly Item: Repository<ItemModel>,
    ) {}

    async create({ createData }: IItemCreate) {
        const itemList = await this.getAll();
        const slug = createSlug(
            `${createData.name}-${(itemList[itemList.length - 1]?.id ?? Date.now()) + 1}`,
        );

        const itemObj = await this.Item.save({ ...createData, slug });
        const item = await this.getById(itemObj.id);
        if (!item) throw new Error('Пользователь не создался');

        return item;
    }

    async getAll() {
        return (await this.Item.find()).sort((a, b) => a.id - b.id);
    }

    async getById(id: number) {
        return await this.Item.findOne({ where: { id } });
    }

    async delete(id: number) {
        const result = await this.Item.delete(id);

        return isUpdateSuccess(result);
    }

    async update(updatedItem: IItemUpdate) {
        type dd = Pretty<IItemUpdate['update']>;

        type ff = Pretty<Parameters<typeof this.Item.update>>[1];
        const result = await this.Item.update(updatedItem.id, updatedItem.update);
        return isUpdateSuccess(result);
    }
}
