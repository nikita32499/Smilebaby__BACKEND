import { IItem, IItemCreate } from '@src/_types/items';
import { EntriesModel } from '@src/entries/entries.model';
import {
  AfterFind,
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'items', timestamps: false })
export class ItemModel extends Model<IItem, IItemCreate> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare descriptions: string;

  @Column(DataType.INTEGER)
  declare price: number;

  @Column(DataType.STRING)
  declare img_main: string;

  @Column(DataType.JSONB)
  declare img_prev: string[];

  //

  //

  @ForeignKey(() => EntriesModel)
  @Column(DataType.INTEGER)
  declare entryId1: number;

  @ForeignKey(() => EntriesModel)
  @Column(DataType.INTEGER)
  declare entryId2: number;

  @BelongsTo(() => EntriesModel, 'entryId1')
  declare entry1: EntriesModel;

  @BelongsTo(() => EntriesModel, 'entryId2')
  declare entry2: EntriesModel;
  //

  //

  //

  //

  //

  //

  //

  //
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare url: string;

  @Column(DataType.JSONB)
  declare amount: IItem['amount'];

  @AllowNull
  @Column({
    type: DataType.BIGINT,
    defaultValue: null,
  })
  declare lastAt: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: () => Date.now(),
  })
  declare createdAt: number;

  @AfterFind
  static FindResult(findResult: IItem | IItem[] | null) {
    if (findResult == null) return;
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const el of findResult) {
      el.createdAt = Number(el.createdAt);
      el.lastAt = el.lastAt && Number(el.lastAt);
    }
  }
}
