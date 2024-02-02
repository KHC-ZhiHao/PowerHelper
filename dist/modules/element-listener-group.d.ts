type EventMap<T extends Element | Document | Window | Worker> = T extends Window ? WindowEventMap : T extends Document ? DocumentEventMap : T extends SVGAElement ? SVGElementEventMap : T extends HTMLMediaElement ? HTMLMediaElementEventMap : T extends HTMLBodyElement ? HTMLBodyElementEventMap : T extends HTMLElement ? HTMLElementEventMap : T extends Worker ? WorkerEventMap : ElementEventMap;
/**
 * 將 element 的 addEventListener 昇華到更好操作的階段。
 * @BrowserOnly
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/element-listener-group.md
 */
export declare class ElementListenerGroup<T extends Element | Document | Window | Worker> {
    private elements;
    private listeners;
    constructor(element?: T);
    /** 加入一個新的監聽對象 */
    observe(element: T): void;
    /** 移除指定 ID 的監聽 */
    off(listenerId: string): void;
    /** 加入一個監聽的項目 */
    add<K extends keyof EventMap<T>>(name: K, callback: (event: EventMap<T>[K]) => void, options?: any): {
        id: string;
        off: () => void;
    };
    /** 清空現在監聽的項目 */
    clear(): void;
}
export {};
