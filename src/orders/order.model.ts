import { IOrder } from '@src/_types/orders.types';
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderModel implements Required<IOrder> {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare phone: string;

  @Column({
    default: null,
    nullable: true,
  })
  declare email: string;

  @Column({
    type: 'jsonb',
  })
  declare items: IOrder['items'];

  @Column({
    type: 'bigint',
    default: () => Date.now().toString(),
  })
  declare createdAt: number;

  @AfterLoad()
  afterLoadHandler() {
    this.createdAt = Number(this.createdAt);
  }
}
