import { Whitespace, VarParameters } from '../types/string';
import { PeelType } from '../types/pick';
/**
 * 值如果是 null | undefined，則回傳預設值。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifempty
 */
export declare const ifEmpty: <T>(data: T | null | undefined, def: T) => T;
/**
 * 比 typeof 回傳更精準的類型。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#gettype
 */
export declare const getType: (target: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "empty" | "array" | "NaN" | "regexp" | "promise" | "buffer" | "error";
/**
 * 獲取指定路徑的值，如果值不存在回傳 `null`。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#peel
 */
export declare const peel: <T extends Record<string, any> = Record<"", any>, C extends string = "", R = PeelType<C, T>>(target: T, path: C) => C extends "" ? T : R | null;
/**
 * 獲取文字裡面的變數列表。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#vars
 */
export declare function vars<S extends string, E extends string, T extends string>({ start, end, text }: {
    /** 複寫起始符號 */
    start: S extends '' ? never : S extends Whitespace ? never : S;
    /** 複寫終止符號 */
    end: E extends '' ? never : E extends Whitespace ? never : E;
    /** 複寫文本 */
    text: T;
}): (keyof VarParameters<S, E, T> extends never ? string : keyof VarParameters<S, E, T>)[];
