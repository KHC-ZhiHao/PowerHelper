declare type KeysOfTypeStrict<T, U> = {
    [P in keyof T]: T[P] extends U ? (U extends T[P] ? P : never) : never;
}[keyof T];
/**
 * 在 Record 中獲取指定類型的參數
 * @example
 * const user = {
 *  name: 'dave',
 *  age: 18
 * }
 * const onlyAge: PickByTypeStrict<number, typeof user> = {
 *  age: 20
 * }
 */
export declare type PickByTypeStrict<U, T> = Pick<T, KeysOfTypeStrict<T, U>>;
export {};
