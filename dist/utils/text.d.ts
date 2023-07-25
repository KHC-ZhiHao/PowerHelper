import { Whitespace, VarParameters } from '../types/string';
/**
 * Text 開頭是否符合目標。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#headmatch
 */
export declare function headMatch(text: string, match: string): boolean;
/**
 * Text 結尾是否符合目標。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#lastmatch
 */
export declare function lastMatch(text: string, match: string): boolean;
/**
 * 獲取指定 Text 的 Byte 長度。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#bytelength
 */
export declare function byteLength(text: string): number;
/**
 * 複寫 Text 的指定變數。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#replacevar
 */
export declare function replaceVar<S extends string, E extends string, T extends string>({ start, end, text, vars, dafaultVar }: {
    /** 變數起始符號 */
    start: S extends '' ? never : S extends Whitespace ? never : S;
    /** 變數終止符號 */
    end: E extends '' ? never : E extends Whitespace ? never : E;
    /** 複寫文本 */
    text: T;
    /** 複寫變數 */
    vars: Partial<VarParameters<S, E, T>>;
    /** 如果找不到對應資料的預設值 */
    dafaultVar?: string;
}): string;
/**
 * 轉換 Text 轉換成指定格式，填入 v 代表映射的值。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#format
 */
export declare const format: (format: string, text: string, def?: string) => string;
/**
 * 將指定文字限縮指定字組中，如果都不符合則返回最後一個字組。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#findmatchorlast
 */
export declare const findMatchOrLast: <T extends string>(target: string, keys: T[]) => T;
