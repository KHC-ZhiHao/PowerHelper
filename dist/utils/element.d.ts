/**
 * 優雅的 Dom 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md
 */
export declare const element: {
    /**
     * 透過執行階段注入 Script Tag，這個方法只允許在 Browser 中執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript
     */
    importScript: (url: string, options?: {
        appendBefore?: ((_el: HTMLScriptElement) => void) | undefined;
    } | undefined) => Promise<unknown>;
    /**
     * 建立一個 Element 並 Append 至 Body 或指定位置，這個方法只允許在 Browser 中執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#createandappend
     * @param {HTMLElement} [target=document.body] 指定位置
     */
    createAndAppend: <T extends keyof HTMLElementTagNameMap>(tag: T, cb: (el: HTMLElementTagNameMap[T]) => any, target?: HTMLElement) => HTMLElementTagNameMap[T];
    /**
     * 透過執行階段注入帶 Stylesheet 的 Link Tag，這個方法只允許在 Browser 中執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importcss
     */
    importCss: (url: string, options?: {
        appendBefore?: ((_el: HTMLLinkElement) => void) | undefined;
    } | undefined) => Promise<unknown>;
};
