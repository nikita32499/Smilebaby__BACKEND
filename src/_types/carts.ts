import { IItem } from './items';

export interface ICart {
  items: IItem[];
  owner: number;

  createdAt: number;
}
