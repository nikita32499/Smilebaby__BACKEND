import { IOrder, IOrderCreate } from '@src/_types/orders';
import {
  AfterFind,
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'orders', timestamps: false })
export class OrderModel
  extends Model<IOrder, IOrderCreate>
  implements Required<IOrder>
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column(DataType.STRING)
  declare name: string;

  @Column(DataType.STRING)
  declare phone: string;

  @AllowNull
  @Column({
    type: DataType.STRING,
    defaultValue: () => null,
  })
  declare email: string;

  @Column(DataType.JSONB)
  declare items: IOrder['items'];

  @Column({
    type: DataType.BIGINT,
    defaultValue: () => Date.now(),
  })
  declare createdAt: number;

  @AfterFind
  static FindResult(findResult: IOrder | IOrder[] | null) {
    if (findResult == null) return;
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const el of findResult) {
      el.createdAt = Number(el.createdAt);
    }
  }
}
