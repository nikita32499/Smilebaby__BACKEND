import { IItem } from './items.types';

export enum EnumEntries {
  COUNTRY = 'COUNTRY',
  SECTION = 'SECTION',
  SEASON = 'SEASON',
}

export interface IEntries {
  id: number;
  name: EnumEntries;
  value: string;

  items: IItem[];
}

export interface IEntriesCreate extends Omit<IEntries, 'id' | 'items'> {}

export interface ICountry extends IEntries {
  name: EnumEntries.COUNTRY;
  value: string;
}

export interface ISection extends IEntries {
  name: EnumEntries.SECTION;
  value: string;
}

export interface ISeason extends IEntries {
  name: EnumEntries.SEASON;
  value: string;
}
