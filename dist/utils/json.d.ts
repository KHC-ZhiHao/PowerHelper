/**
 * 如果 Parse 發生錯誤則回傳 {}
 */
export declare const nonStrictJSONParse: (data: string) => any;
/**
 * 如果 Stringify 發生錯誤則回傳 '{}'
 */
export declare const nonStrictJSONStringify: (data: Record<string, any>) => string;
