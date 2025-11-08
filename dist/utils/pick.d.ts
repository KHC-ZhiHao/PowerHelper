import { Whitespace, VarParameters } from '../types/string.js';
import { PeelType } from '../types/pick.js';
/**
 * 精準地提取目標相關資源。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md
 */
export declare const pick: {
    /**
     * 值如果是 null | undefined | Error | NaN，則回傳預設值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifbad
     */
    ifBad: <T>(data: Error | T | null | undefined, def: T) => Error | T | null | undefined;
    /**
     * 值如果是 null | undefined，則回傳預設值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifempty
     */
    ifEmpty: <T_1>(data: T_1 | null | undefined, def: T_1) => T_1;
    /**
     * 比 typeof 回傳更精準的類型。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#gettype
     */
    getType: (target: any) => 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'object' | 'function' | 'empty' | 'array' | 'NaN' | 'regexp' | 'promise' | 'buffer' | 'error';
    /**
     * 獲取指定路徑的值，如果值不存在回傳 `null`。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#peel
     */
    peel: <T_2 extends Record<string, any> = Record<"", any>, C extends string = "", R = PeelType<C, T_2>>(target: T_2, path: C) => C extends "" ? T_2 : R | null;
    /**
     * 獲取文字裡面的變數列表。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#vars
     */
    vars: <S extends string, E extends string, T_3 extends string>({ start, end, text }: {
        /** 複寫起始符號 */
        start: S extends "" ? never : S extends Whitespace ? never : S;
        /** 複寫終止符號 */
        end: E extends "" ? never : E extends Whitespace ? never : E;
        /** 複寫文本 */
        text: T_3;
    }) => (keyof VarParameters<S, E, T_3> extends never ? string : keyof VarParameters<S, E, T_3>)[];
};
