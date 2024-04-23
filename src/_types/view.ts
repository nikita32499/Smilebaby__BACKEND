export enum EnumViewNames {
  SECTIONS = 'SECTIONS',
  COUNTRYS = 'COUNTRYS',
  SEASONS = 'SEASONS',
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

// export interface IView__SECTIONS extends IView {
//   payload: ViewAttrValue<{ id: number; name: string; img: string }[]>;
// }

// export const SchemaView__SECTIONS: SchemaType<Omit<IView__SECTIONS, 'id'>> = {
//   type: 'object',
//   properties: {
//     name: { const: EnumViewNames['SECTIONS'] },
//     description: { type: 'string' },
//     payload: {
//       type: 'object',
//       properties: {
//         description: { type: 'string' },
//         value: {
//           type: 'array',
//           items: {
//             type: 'object',
//             properties: {
//               id: { type: 'number' },
//               name: { type: 'string' },
//               img: { type: 'string' },
//             },
//             required: ['id', 'name', 'img'],
//           },
//         },
//       },
//       required: ['value', 'description'],
//     },
//   },
//   required: ['description', 'payload', 'name'],
// };

// export interface IView__SEASONS extends IView {
//   name: EnumViewNames.SEASONS;
//   payload: ViewAttrValue<{ id: number; season: string }[]>;
// }

// export const SchemaView__SEASONS: SchemaType<Omit<IView__SEASONS, 'id'>> = {
//   type: 'object',
//   properties: {
//     name: { const: EnumViewNames.SEASONS },
//     description: { type: 'string' },
//     payload: {
//       type: 'object',
//       properties: {
//         description: { type: 'string' },
//         value: {
//           type: 'array',
//           items: {
//             type: 'object',
//             properties: {
//               id: { type: 'number' },
//               season: { type: 'string' },
//             },
//             required: ['id', 'season'],
//           },
//         },
//       },
//       required: ['value', 'description'],
//     },
//   },
//   required: ['description', 'payload', 'name'],
// };

// export interface IView__COUNTRYS extends IView {
//   name: EnumViewNames.COUNTRYS;
//   payload: ViewAttrValue<{ id: number; country: string }[]>;
// }

// export const SchemaView__COUNTRYS: SchemaType<Omit<IView__COUNTRYS, 'id'>> = {
//   type: 'object',
//   properties: {
//     name: { const: EnumViewNames.COUNTRYS },
//     description: { type: 'string' },
//     payload: {
//       type: 'object',
//       properties: {
//         description: { type: 'string' },
//         value: {
//           type: 'array',
//           items: {
//             type: 'object',
//             properties: {
//               id: { type: 'number' },
//               country: { type: 'string' },
//             },
//             required: ['id', 'country'],
//           },
//         },
//       },
//       required: ['value', 'description'],
//     },
//   },
//   required: ['description', 'payload', 'name'],
// };

// export type IViewUnion = IView__SECTIONS | IView__COUNTRYS | IView__SEASONS;
