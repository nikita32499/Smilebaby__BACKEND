import { EnumViewNames, ICreateView, IView } from '@src/_types/view';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'view',
  timestamps: false,
})
export class ViewModel
  extends Model<IView, ICreateView>
  implements Required<IView>
{
  declare id: number;

  @Column({
    type: DataType.ENUM(...Object.values(EnumViewNames)),
    unique: true,
  })
  declare name: EnumViewNames;

  @Column({
    type: DataType.JSONB,
  })
  declare payload: object;

  @Column(DataType.STRING)
  declare description: string;
}
