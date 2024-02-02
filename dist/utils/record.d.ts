import { DeepReadonly } from '../types/record';
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
    setMapValue: <T extends unknown>(template: T, target: JsonObject, options?: SetMapValueOptions) => T;
    /**
     * 建立一組嚴格檢查、轉譯並實質不能變動的 Object，通常應用在環境變數。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#createstrictobject
     */
    createStrictObject: <T_1 extends StrictObjectParams>(envs: T_1) => DeepReadonly<{ [key in keyof T_1]: T_1[key][0] extends StringConstructor ? string : T_1[key][0] extends NumberConstructor ? number : T_1[key][0] extends BooleanConstructor ? boolean : unknown; }>;
    /**
     * 淺拷貝同一份 Object，但忽略掉指定對象。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#omit
     */
    omit: <D extends object, T_2 extends (keyof D)[]>(data: D, keys: T_2) => Omit<D, T_2[0]>;
    /**
     * Promise.all 的鍵值對版本。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#promiseallwithkeys
     */
    promiseAllWithKeys: <T_3 extends Record<string, Promise<any>>>(obj: T_3) => Promise<{ [K in keyof T_3]: T_3[K] extends Promise<infer U> ? U : never; }>;
    /**
     * 簡易比對兩個 Object 是否有差異，有差異回傳 true，僅支援 JSON 的所有型態。
     */
    simpleCheckDeepDiff: <T_4 extends Record<string, any>>(a: T_4, b: T_4) => boolean;
};
export {};
