type StyleKeys = keyof CSSStyleDeclaration;
/**
 * 方便組合出 HTML Element Style 的工具。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/style-string.md
 */
export declare class StyleString {
    private styles;
    /** 寫入 key */
    set(key: StyleKeys, value?: string, defaultValue?: string): void;
    /** 獲取指定 key 的值 */
    get(key: StyleKeys): string;
    /** 刪除指定的 key */
    remove(key: StyleKeys): void;
    /** 從對象面附値 */
    assign(element: HTMLElement): void;
    /** 獲得 style string */
    join(separator?: string): string;
}
export {};
