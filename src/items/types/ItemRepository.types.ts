import { IItem, IItemCreate, IItemUpdate } from 'shared_SmileBaby/dist/types/item.types';

export interface IItemRepository {
    getAll: () => Promise<IItem[]>;
    getById: (id: number) => Promise<IItem | null>;
    create: (createData: IItemCreate) => Promise<IItem>;
    update: (updateData: IItemUpdate) => Promise<boolean>;
    delete: (id: number) => Promise<boolean>;
}
