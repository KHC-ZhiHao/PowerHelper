import { Base } from '../module-base';
declare type StyleKeys = keyof CSSStyleDeclaration;
export declare class StyleString extends Base {
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
