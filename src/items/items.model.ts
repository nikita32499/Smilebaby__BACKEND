import { IItem } from '@src/_types/items.types';
import { EntriesModel } from '@src/entries/entries.model';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ItemModel implements Required<IItem> {
  @PrimaryGeneratedColumn()
  declare id: number;

  @Column()
  declare name: string;

  @Column()
  declare descriptions: string;

  @Column()
  declare price: number;

  @Column()
  declare img_main: string;

  @Column({
    type: 'jsonb',
  })
  declare img_prev: string[];

  //

  //

  @Column({ type: 'integer' })
  declare seasonId: number;

  @ManyToOne(() => EntriesModel, { eager: true })
  @JoinColumn({ name: 'seasonId' })
  declare season: EntriesModel;

  //

  //

  @Column({ type: 'integer' })
  declare countryId: number;

  @ManyToOne(() => EntriesModel, { eager: true })
  @JoinColumn({ name: 'countryId' })
  declare country: EntriesModel;

  //

  //

  @Column({ type: 'integer' })
  declare sectionId: number;

  @ManyToOne(() => EntriesModel, { eager: true })
  @JoinColumn({ name: 'sectionId' })
  declare section: EntriesModel;

  //

  //

  //

  //

  //

  //
  @Column({
    unique: true,
  })
  declare slug: string;

  @Column({
    type: 'jsonb',
  })
  declare amount: IItem['amount'];

  declare lastAt: number;

  @Column({
    type: 'bigint',
    default: () => Date.now().toString(),
  })
  declare createdAt: number;

  @AfterLoad()
  FindResult() {
    this.createdAt = Number(this.createdAt);
    this.lastAt = this.lastAt && Number(this.lastAt);
  }
}
