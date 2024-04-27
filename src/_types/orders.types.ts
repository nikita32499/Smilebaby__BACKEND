import { IItem } from './items.types';

export interface IOrder {
  id: number;
  items: {
    item: IItem;
    size: string;
    quantity: number;
  }[];
  phone: string;
  name: string;
  email?: string;

  createdAt: number;
}

export interface IOrderCreate extends Omit<IOrder, 'id' | 'createdAt'> {}

export interface IOrderUpdate extends Partial<IOrderCreate> {}
