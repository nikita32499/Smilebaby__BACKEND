declare global {
    // type IsEqual<A, B> =
    //     (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    //         ? true
    //         : never;

    export type Pretty<T> = T extends object
        ? {
              [K in keyof T]: T[K] extends object ? Pretty<T[K]> : T[K];
          }
        : T extends Array<infer Element>
          ? Pretty<Element>[]
          : T;

    // export type PartialAndUndefined<OBJ extends object> = {
    //     [K in keyof OBJ]?: OBJ[K] | undefined;
    // };
}

export {};
