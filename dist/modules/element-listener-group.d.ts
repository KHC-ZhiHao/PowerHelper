declare type EventMap<T extends Element | Document | Window> = T extends Window ? WindowEventMap : T extends Document ? DocumentEventMap : T extends SVGAElement ? SVGElementEventMap : T extends HTMLMediaElement ? HTMLMediaElementEventMap : T extends HTMLBodyElement ? HTMLBodyElementEventMap : T extends HTMLElement ? HTMLElementEventMap : ElementEventMap;
export declare class ElementListenerGroup<T extends Element | Document | Window> {
    private element;
    private listeners;
    constructor(element: T);
    /** 加入一個監聽的項目 */
    add<K extends keyof EventMap<T>>(name: K, callback: (event: EventMap<T>[K]) => void, options?: any): {
        /** 鎖定時不會被 clear 給移除 */
        lock: (active?: boolean) => any;
        /** 關閉這組監聽對象 */
        off: () => any;
    };
    /** 清空現在監聽的項目，不包含已 lock 的對象 */
    clear(): void;
}
export {};
