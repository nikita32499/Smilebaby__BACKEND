import { EnumEntries, IEntries, IEntriesCreate } from '@src/_types/entries';
import { ItemModel } from '@src/items/items.model';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'entries',
  timestamps: false,
})
export class EntriesModel extends Model<IEntries, IEntriesCreate> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column(DataType.ENUM(...Object.values(EnumEntries)))
  declare name: EnumEntries;

  @Column(DataType.STRING)
  declare value: string;

  @HasMany(() => ItemModel)
  declare items: ItemModel[];
}
