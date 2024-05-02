/* кастомные интерфейсы страниц */

import { SchemaType } from './utils.types';
import { EnumViewNames, IView, ViewAttrValue } from './view.types';

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
