import { PeelPath } from '../types/pick';
import { DeepReadonly } from '../types/record';
declare type JsonObject = string | number | boolean | unknown | unknown[] | null | JsonObject[] | {
    [key: string]: JsonObject;
};
declare type SetMapValueOptions<T> = {
    directReplacePeels?: PeelPath<'', T>[];
};
/**
 * 複製指定物件的值到目標 Object 上，並產生一份新的 Object，細部規則可詳見 example。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#setmapvalue
 */
export declare const setMapValue: <T extends unknown>(template: T, target: JsonObject, options?: SetMapValueOptions<T> | undefined) => T;
declare type StrictObjectParams = {
    [key: string]: [typeof String | typeof Boolean | typeof Number, boolean, unknown, any?];
};
/**
 * 建立一組嚴格檢查、轉譯並實質不能變動的 Object，通常應用在環境變數。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#createstrictobject
 */
export declare const createStrictObject: <T extends StrictObjectParams>(envs: T) => DeepReadonly<{ [key in keyof T]: T[key][0] extends StringConstructor ? string : T[key][0] extends NumberConstructor ? number : T[key][0] extends BooleanConstructor ? boolean : unknown; }>;
/**
 * 淺拷貝同一份 Object，但忽略掉指定對象。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#omit
 */
export declare const omit: <D extends object, T extends (keyof D)[]>(data: D, keys: T) => Omit<D, T[0]>;
/**
 * Promise.all 的鍵值對版本。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#promiseallwithkeys
 */
export declare const promiseAllWithKeys: <T extends Record<string, Promise<any>>>(obj: T) => Promise<{ [K in keyof T]: T[K] extends Promise<infer U> ? U : never; }>;
export {};
