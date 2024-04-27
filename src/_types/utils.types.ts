type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
    ? R
    : never;

type Push<T extends any[], V> = [...T, V];

type TuplifyUnion<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false,
> = true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;

type Tuple<
  T,
  A extends T[] = [],
> = TuplifyUnion<T>['length'] extends A['length']
  ? [...A]
  : Tuple<T, [T, ...A]>;

type SchemaPropertyType<T> = T extends string
  ? { type: 'string' } | { const: T }
  : T extends number
    ? { type: 'number' }
    : T extends boolean
      ? { type: 'boolean' }
      : T extends Array<infer El>
        ? {
            type: 'array';
            items: SchemaPropertyType<El>;
          }
        : T extends object
          ? SchemaType<T>
          : never;

export type SchemaType<T> = {
  type: 'object';
  properties: {
    [K in keyof T]: SchemaPropertyType<T[K]>;
  };
  required: Tuple<keyof T>;
};
