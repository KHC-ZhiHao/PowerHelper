/**
 * 經典的深拷貝方案 JSON.parse(JSON.stringify(data))
 */
export declare const jpjs: <T>(data: T) => T;
/**
 * 如果 Parse 發生錯誤則回傳 {}
 */
export declare const nonStrictJSONParse: (data: string) => any;
/**
 * 如果 Stringify 發生錯誤則回傳 '{}'
 */
export declare const nonStrictJSONStringify: (data: Record<string, any>) => string;
