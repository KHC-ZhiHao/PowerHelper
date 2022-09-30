import { PeelPath } from '../types/pick';
import { DeepReadonly } from '../types/record';
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
declare type StrictObjectParams = {
    [key: string]: [typeof String | typeof Boolean | typeof Number, boolean, unknown, any?];
};
/**
 * 建立一組嚴格檢查、轉譯並實質不能變動的物件，通常應用在環境變數，防止出現定義問題。
 * @example
 * const env = createStrictObject({
 *     isProd: [Boolean, true, 'true'],
 *     baseUrl: [String, true, process.env.baseUrl],
 *     port: [Number, true, '8080'],
 *     isLocal: [Boolean, false, null, false]
 * })
 * console.log(record.setMapValue(template, data. options?))
 * // output
 * {
 *     isProd: true,
 *     baseUrl: 'http://hello.com',
 *     port: 8080,
 *     isLocal: false
 * }
 */
export declare const createStrictObject: <T extends StrictObjectParams>(envs: T) => DeepReadonly<{ [key in keyof T]: T[key][0] extends StringConstructor ? string : T[key][0] extends NumberConstructor ? number : T[key][0] extends BooleanConstructor ? boolean : unknown; }>;
export {};
