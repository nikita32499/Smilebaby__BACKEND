import { EnumEntries, IEntriesBase } from 'shared_SmileBaby/dist/types/entries.types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntriesModel implements IEntriesBase {
    @PrimaryGeneratedColumn()
    declare id: number;

    @Column({
        type: 'enum',
        enum: EnumEntries,
    })
    declare name: EnumEntries;

    @Column()
    declare value: string;

    @Column({
        type: 'jsonb',
        default: {},
    })
    declare data: object;
}
