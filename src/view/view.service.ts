import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    EnumViewNames,
    IViewCreateUnion,
} from 'shared_SmileBaby/dist/types/view-custom.types';
import { Repository } from 'typeorm';
import { IViewRepository } from './types/ViewRepository.types';
import { ViewModel } from './view.model';

@Injectable()
export class ViewService implements IViewRepository {
    constructor(@InjectRepository(ViewModel) private View: Repository<ViewModel>) {}

    async saveView(createData: IViewCreateUnion) {
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
