import { Whitespace, VarParameters } from '../types/string.js';
/**
 * 字串相關的處理。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md
 */
export declare const text: {
    /**
     * Text 開頭是否符合目標。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#headmatch
     */
    headMatch: (text: string, match: string) => boolean;
    /**
     * Text 結尾是否符合目標。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#lastmatch
     */
    lastMatch: (text: string, match: string) => boolean;
    /**
     * 獲取指定 Text 的 Byte 長度。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#bytelength
     */
    byteLength: (text: string) => number;
    /**
     * 複寫 Text 的指定變數。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#replacevar
     */
    replaceVar: <S extends string, E extends string, T extends string>({ start, end, text, vars, defaultVar }: {
        /** 變數起始符號 */
        start: S extends "" ? never : S extends Whitespace ? never : S;
        /** 變數終止符號 */
        end: E extends "" ? never : E extends Whitespace ? never : E;
        /** 複寫文本 */
        text: T;
        /** 複寫變數 */
        vars: Partial<VarParameters<S, E, T>>;
        /** 如果找不到對應資料的預設值 */
        defaultVar?: string | undefined;
    }) => string;
    /**
     * 轉換 Text 轉換成指定格式，填入 v 代表映射的值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#format
     */
    format: (format: string, text: string, def?: string) => string;
    /**
     * 將指定文字限縮指定字組中，如果都不符合則返回最後一個字組。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#findmatchorlast
     */
    findMatchOrLast: <T_1 extends string>(target: string, keys: T_1[]) => T_1;
    /**
     * 只提取指定標籤中的內容。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#pickintagcontents
     */
    pickInTagContents: (params: {
        text: string;
        start: string;
        end: string;
    }) => string[];
    /**
     * 只刪除指定標籤中的內容。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#removeintagcontents
     */
    removeInTagContents(params: {
        text: string;
        start: string;
        end: string;
    }): string;
};
