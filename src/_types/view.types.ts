import { SchemaType } from './utils.types';

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

/* кастомные интерфейсы страниц */

export interface IView__HOME extends IView {
  payload: {
    slider: ViewAttrValue<{ id: number; target: string; img_url: string }[]>;
  };
}

export const SchemaView__HOME: SchemaType<Omit<IView__HOME, 'id'>> = {
  type: 'object',
  properties: {
    name: { const: EnumViewNames['HOME'] },
    description: { type: 'string' },
    payload: {
      type: 'object',
      properties: {
        slider: {
          type: 'object',
          properties: {
            description: { type: 'string' },
            value: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  target: { type: 'string' },
                  img_url: { type: 'string' },
                },
                required: ['id', 'target', 'img_url'],
              },
            },
          },
          required: ['value', 'description'],
        },
      },
      required: ['slider'],
    },
  },
  required: ['description', 'payload', 'name'],
};

export type IViewUnion = IView__HOME;
