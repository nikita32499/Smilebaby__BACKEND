import { IItem } from './items.types';

export interface ICart {
  items: IItem[];
  owner: number;

  createdAt: number;
}
