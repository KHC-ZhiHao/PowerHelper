declare type JsonObject = string | number | boolean | null | JsonObject[] | {
    [key: string]: JsonObject;
};
/**
 * 複製指定物件的值到目標物件上，並產生一份新的物件。
 * @example
 * const template = {
 *     name: 'dave',
 *     age: 18 // data 沒有 age，採用原本的值
 * }
 * const data = {
 *     name: 'james', // 共同有 name 的 key 值，所以複寫 template 的 name
 *     sex: 'M' // template 沒有 sex，忽略
 * }
 * // { name: 'james', age: 18 }
 * console.log(record.setMapValue(template, data))
 */
export declare const setMapValue: <T extends JsonObject>(template: T, target: JsonObject) => T;
export {};
