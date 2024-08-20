import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createSlug } from '_helpers/slug';
import { isUpdateSuccess } from '_helpers/typeOrm';
import {
    EnumEntries,
    IEntriesCreate,
    IEntriesUpdate,
} from 'shared_SmileBaby/dist/types/entries.types';
import { Repository } from 'typeorm';
import { EntriesModel } from './entries.model';
import { IEntriesRepository } from './types/EntriesRepository.types';

@Injectable()
export class EntriesService implements IEntriesRepository {
    constructor(
        @InjectRepository(EntriesModel)
        private Entry: Repository<EntriesModel>,
    ) {}

    async create({ createData }: IEntriesCreate) {
        if (createData.name === EnumEntries.SECTION) {
            const EntriesList = await this.getAll();
            const nextId = (EntriesList[EntriesList.length - 1]?.id ?? 0) + 1;
            createData.data.slug = createSlug(`${createData.value}-${nextId}`);

            const FailUniqueSlug: boolean = EntriesList.filter(
                (entry) => entry.name === EnumEntries.SECTION,
            ).some(
                (entry) =>
                    'slug' in entry.data &&
                    typeof entry.data.slug === 'string' &&
                    entry.data.slug === createData.data.slug,
            );

            if (createData.data.slug.length === 0 || FailUniqueSlug) {
                throw new Error('SLUG во время создания товара не уникален');
            }
        }

        const userEntry = await this.Entry.save(createData);

        return userEntry;
    }

    async getAll() {
        return (await this.Entry.find()).sort((a, b) => a.id - b.id);
    }

    async getById(id: number) {
        const result = await this.Entry.findOne({ where: { id } });
        if (result) {
            return result;
        }
        return null;
    }

    async update(newDataEntries: IEntriesUpdate) {
        const result = await this.Entry.update(newDataEntries.id, newDataEntries.update);
        return isUpdateSuccess(result);
    }

    async delete(id: number) {
        const result = await this.Entry.delete(id);
        return isUpdateSuccess(result);
    }
}
