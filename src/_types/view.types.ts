export enum EnumViewNames {
  HOME = 'HOME',
}

export function isView(data: unknown): data is IView {
  return (
    typeof data === 'object' &&
    data != null &&
    'id' in data &&
    'name' in data &&
    'payload' in data
  );
}

export interface IView {
  id: number;
  name: EnumViewNames;
  payload: object;
  description: string;
}

export interface ICreateView extends Omit<IView, 'id'> {}

export type ViewAttrValue<Value> = {
  description: string;
  value: Value extends Array<infer El>
    ? El extends { id: number }
      ? Value
      : never
    : Value;
};

export * from './view_custom.types';
