export interface IItem {
  id: number;
  name: string;
  descriptions: string;
  price: number;
  img_main: string;
  img_prev: string[];
  amount: { quantity: number; size: string }[];

  // seasonId: number;
  // season: IEntries;

  // countryId: number;
  // country: IEntries;

  // sectionId: number;
  // section: IEntries;

  lastAt: number;
  createdAt: number;

  url: string;
}

export interface IItemCreate
  extends Omit<IItem, 'id' | 'lastAt' | 'createdAt'> {}

export interface IUserUpdate extends Partial<IItemCreate> {}
