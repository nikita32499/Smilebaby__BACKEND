import {
    IEntriesBase,
    IEntriesCreate,
    IEntriesUpdate,
} from 'shared_SmileBaby/dist/types/entries.types';

export interface IEntriesRepository {
    getAll: () => Promise<IEntriesBase[]>;
    getById: (id: number) => Promise<IEntriesBase | null>;
    create: (createData: IEntriesCreate) => Promise<IEntriesBase>;
    update: (updateData: IEntriesUpdate) => Promise<boolean>;
    delete: (id: number) => Promise<boolean>;
}
