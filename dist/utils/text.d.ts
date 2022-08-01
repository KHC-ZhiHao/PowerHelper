import { Whitespace, VarParameters } from '../types/string';
/** 字串開頭是否符合指定目標 */
export declare function headMatch(text: string, match: string): boolean;
/** 字串結尾是否符合指定目標 */
export declare function lastMatch(text: string, match: string): boolean;
/** 獲取指定字串的 Byte 長度 */
export declare function byteLength(text: string): number;
/**
 * 複寫字串的指定變數。
 * @example
 * let result = replaceVar({
 *  start: '{',
 *  end: '}',
 *  text: '你好我是 {name}，目前是 {job}。',
 *  vars: {
 *    name: 'dave',
 *    job: 'rd'
 *  },
 *  dafaultVar: '-'
 * })
 * console.log(result) // 你好我是 dave，目前是 rd。
 */
export declare function replaceVar<S extends string, E extends string, T extends string>({ start, end, text, vars, dafaultVar }: {
    /** 複寫起始符號 */
    start: S extends '' ? never : S extends Whitespace ? never : S;
    /** 複寫終止符號 */
    end: E extends '' ? never : E extends Whitespace ? never : E;
    /** 複寫文本 */
    text: T;
    /** 複寫變數 */
    vars: Partial<VarParameters<S, E, T>>;
    /** 如果沒有定義變數則覆蓋預設值 */
    dafaultVar?: string;
}): string;
