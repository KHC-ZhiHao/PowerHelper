/**
 * 經典的深拷貝方案 JSON.parse(JSON.stringify(data))。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#jpjs
 */
export declare const jpjs: <T>(data: T) => T;
/**
 * 執行 JSON Parse，如果失敗回傳空白物件 `{}`。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonparse
 */
export declare const nonStrictJSONParse: (data: string) => any;
/**
 * 執行 JSON Stringify，如果失敗回傳字串 `'{}'`。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonstringify
 */
export declare const nonStrictJSONStringify: (data: Record<string, any>) => string;
