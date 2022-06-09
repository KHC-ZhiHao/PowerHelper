import { PeelPath } from '../types/pick';
declare type JsonObject = string | number | boolean | unknown | unknown[] | null | JsonObject[] | {
    [key: string]: JsonObject;
};
declare type SetMapValueOptions<T> = {
    directReplacePeels?: PeelPath<'', T>[];
};
/**
 * 複製指定物件的值到目標物件上，並產生一份新的物件。
 * @example
 * const template = {
 *     name: 'dave',
 *     age: 18, // data 沒有 age，採用原本的值
 *     parents: ['mother', 'father'],
 *     carts: {
 *         bike: {
 *             name: 'gt',
 *             boughtAt: '2022-01-01'
 *         }
 *     }
 * }
 * const data = {
 *     name: 'james', // 共同有 name 的 key 值，所以複寫 template 的 name
 *     sex: 'M', // template 沒有 sex，忽略
 *     parents: ['sister'] // 如果是陣列會直接複寫
 *     carts: { // 如果是物件則會深入復寫，可以透過 options.directReplacePeels 直接覆蓋値
 *         bike: {
 *             name: 'ubike'
 *         }
 *     }
 * }
 * console.log(record.setMapValue(template, data. options?))
 * // output
 * {
 *     name: 'james',
 *     age: 18,
 *     parents: ['sister'],
 *     carts: {
 *         name: 'ubike',
 *         boughtAt: '2022-01-01'
 *     }
 * }
 */
export declare const setMapValue: <T extends unknown>(template: T, target: JsonObject, options?: SetMapValueOptions<T> | undefined) => T;
export {};
