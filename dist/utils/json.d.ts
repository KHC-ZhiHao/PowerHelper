/**
 * 如果 Parse 發生錯誤則回傳 {}
 */
export declare const notStrictJSONParse: (data: string) => any;
/**
 * 如果 Stringify 發生錯誤則回傳 '{}'
 */
export declare const notStrictJSONStringify: (data: Record<string, any>) => string;
