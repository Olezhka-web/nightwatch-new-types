/**
 * Merge Objects Array
 *
 * @example
 * If array
 * [{ a: {}, b: {} }, { c: {} }] => { a: {}, b: {}, c: {} }
 *
 * If object
 * {} => {}
 */
export type MergeObjectsArray<T> = T extends Array<infer U>
  ? {
    [K in keyof U]: U[K];
  }
  : T;