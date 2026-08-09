import { DeepReadonly } from '../types/record.js';
type JsonObject = string | number | boolean | unknown | unknown[] | null | JsonObject[] | {
    [key: string]: JsonObject;
};
type SetMapValueOptions = {
    directReplacePeels?: string[];
};
type StrictObjectParams = {
    [key: string]: [typeof String | typeof Boolean | typeof Number, boolean, unknown, any?];
};
/**
 * 優雅的 Object 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md
 */
export declare const record: {
    /**
     * 複製指定物件的值到目標 Object 上，並產生一份新的 Object，細部規則可詳見 example。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#setmapvalue
     */
    setMapValue: <T extends JsonObject>(template: T, target: JsonObject, options?: SetMapValueOptions) => T;
    /**
     * 建立一組嚴格檢查、轉譯並實質不能變動的 Object，通常應用在環境變數。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#createstrictobject
     */
    createStrictObject: <T extends StrictObjectParams>(envs: T) => DeepReadonly<{ [key in keyof T]: T[key][0] extends typeof String ? string : (T[key][0] extends typeof Number ? number : (T[key][0] extends typeof Boolean ? boolean : unknown)); }>;
    /**
     * 淺拷貝同一份 Object，但忽略掉指定對象。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#omit
     */
    omit: <D extends object, T extends (keyof D)[]>(data: D, keys: T) => Omit<D, T[0]>;
    /**
     * Promise.all 的鍵值對版本。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#promiseallwithkeys
     */
    promiseAllWithKeys: <T extends Record<string, Promise<any>>>(obj: T) => Promise<{ [K in keyof T]: T[K] extends Promise<infer U> ? U : never; }>;
    /**
     * 簡易比對兩個 Object 是否有差異，有差異回傳 true，僅支援 JSON 的所有型態。
     */
    simpleCheckDeepDiff: <T extends Record<string, any>>(a: T, b: T) => boolean;
};
export {};
