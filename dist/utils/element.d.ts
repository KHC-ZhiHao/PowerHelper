/**
 * 透過執行階段注入 Javascript Tag，這個方法只允許在 Browser 中執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript
 */
export declare const importScript: (url: string) => Promise<unknown>;
/**
 * 新增並將 Tag Append 至指定 Element，這個方法只允許在 Browser 中執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#createandappend
 */
export declare const createAndAppend: <T extends keyof HTMLElementTagNameMap>(tag: T, cb: (el: HTMLElementTagNameMap[T]) => any, target?: HTMLElement) => HTMLElementTagNameMap[T];
