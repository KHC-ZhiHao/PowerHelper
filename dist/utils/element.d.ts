/**
 * 透過執行階段注入 Javascript Tag，這個方法只允許在 Browser 中執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript
 */
export declare const importScript: (url: string, options?: {
    appendBefore?: ((_el: HTMLScriptElement) => void) | undefined;
} | undefined) => Promise<unknown>;
/**
 * 新增並將 Tag Append 至指定 Element，這個方法只允許在 Browser 中執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#createandappend
 */
export declare const createAndAppend: <T extends keyof HTMLElementTagNameMap>(tag: T, cb: (el: HTMLElementTagNameMap[T]) => any, target?: HTMLElement) => HTMLElementTagNameMap[T];
/**
 * 透過執行階段注入帶 stylesheet 的 Link Tag，這個方法只允許在 Browser 中執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importcss
 */
export declare const importCss: (url: string, options?: {
    appendBefore?: ((_el: HTMLLinkElement) => void) | undefined;
} | undefined) => Promise<unknown>;
