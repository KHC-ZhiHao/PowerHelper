import { Whitespace, VarParameters } from '../types/string';
import { PeelPath, PeelType } from '../types/pick';
/** 指定的值如果是 null，則回傳預設值 */
export declare const ifEmpty: <T>(data: T | undefined, def: T) => T;
/** 比 typeof 回傳更精準的類型 */
export declare const getType: (target: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "empty" | "array" | "NaN" | "regexp" | "promise" | "buffer" | "error";
/**
 * 獲取指定路徑的值
 * @see https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Optional_chaining
 */
export declare const peel: <T extends Record<string, any>, C extends PeelPath<"", T, keyof T>, R extends PeelType<C, T>>(target: T, path: C) => C extends "" ? T : R | null;
/**
 * 複寫字串的指定變數。
 * @example
 * let result = pickVar({
 *  start: '{',
 *  end: '}',
 *  text: '你好我是 {name}，目前是 {job}。'
 * })
 * console.log(result) // ['name', 'job']
 */
export declare function pickVar<S extends string, E extends string, T extends string>({ start, end, text }: {
    /** 複寫起始符號 */
    start: S extends '' ? never : S extends Whitespace ? never : S;
    /** 複寫終止符號 */
    end: E extends '' ? never : E extends Whitespace ? never : E;
    /** 複寫文本 */
    text: T;
}): (keyof VarParameters<S, E, T>)[];
