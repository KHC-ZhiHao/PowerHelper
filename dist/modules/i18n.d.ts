import { Event } from './event';
import { VarParameters } from '../types/string';
type Params<L extends string, K extends string> = {
    def: L;
    locales: {
        [key in L]: {
            [key in K]: string;
        };
    };
};
type Events = {
    get: {
        key: string;
        text: string;
        locale: string;
        output: string;
    };
};
/**
 * 多語系操作系統。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/i18n.md
 */
export declare class I18n<L extends string, K extends string> extends Event<Events> {
    private params;
    private nowLocale;
    constructor(params: Params<L, K>);
    private get;
    /** 輸出選定的語系 */
    export(locale: L): <T extends K | `##${string}`, V extends VarParameters<"{", "}", T extends string ? T : "">>(key: T, ...vars: V extends Record<string, never> ? any[] : [V]) => string;
    /** 返回指定鍵值的語系 */
    t<T extends (K | `##${string}`), V extends VarParameters<'{', '}', T extends string ? T : ''>>(key: T, ...vars: V extends Record<string, never> ? any[] : [V]): string;
    /** 設定語系 */
    setLocale(locale: L): void;
    /** 獲取當前語系 */
    getLocale(): L;
    /**
     * 獲取鍵值來協助延後獲取語系
     * @example
     * i18n.key('user').get('zh')
     * // output: 使用者
     */
    key<T extends (K | `##${string}`), V extends VarParameters<'{', '}', T extends string ? T : ''>>(key: T, ...vars: V extends Record<string, never> ? any[] : [V]): {
        get: (locale: L) => string;
    };
}
export {};
