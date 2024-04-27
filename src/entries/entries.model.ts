import { EnumEntries, IEntries } from '@src/_types/entries.types';
import { ItemModel } from '@src/items/items.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntriesModel implements Required<IEntries> {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: EnumEntries;

  @Column()
  declare value: string;

  @OneToMany(() => ItemModel, (item) => item.id) // Подставьте соответствующее название связи и атрибут в ItemModel
  declare items: ItemModel[];
}
