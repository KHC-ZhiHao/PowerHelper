declare type ListenerContext = {
    /**
     * @zh 唯一並隨機的 Listener ID
     * @en Unique and random Listener ID
     */
    id: string;
    /**
     * @zh 關閉這個 Listener
     * @en Close this Listener
     */
    off: () => void;
    /**
     * @zh 一組可供當下 Listener 儲存的空白物件
     * @en A set of blank objects that can be stored by the current Listener
     */
    state: Record<string, any>;
};
declare type ListenerCallback<T> = (_data: T, _context: ListenerContext) => void;
declare class Listener<T> {
    /**
     * @zh 唯一並隨機的 Listener ID
     * @en Unique and random Listener ID
     */
    readonly id: string;
    /**
     * @zh 一組可供當下 Listener 儲存的空白物件
     * @en A set of blank objects that can be stored by the current Listener
     */
    readonly state: Record<string, any>;
    /**
     * @zh 監聽的事件
     * @en Listened event
     */
    readonly event: string;
    private callback;
    private manager;
    constructor(manager: Event<any>, event: string, callback: ListenerCallback<any>);
    /**
     * @zh 觸發這個監聽對象
     * @en Trigger this Listener
     */
    invoke(data: T): void;
    /**
     * @zh 關閉這個 Listener
     * @en Close this Listener
     */
    off(): void;
}
export declare class Event<T extends Record<string, Record<string, any>>> {
    private listeners;
    /**
     * @zh 獲取指定事件的監聽數量
     * @en Get the number of listeners for the specified event
     */
    getEventListenerSize<K extends keyof T>(event: K): number;
    /**
     * @zh 發送資料至指定事件
     * @en Send data to the specified event
     */
    emit<K extends keyof T>(event: K, data: T[K]): void;
    /**
     * @zh 停止指定事件與 ID 的 Listener
     * @en Stop the Listener of the specified event and ID
     */
    off<K extends keyof T>(event: K, id: string): void;
    /**
     * @zh 監聽指定事件
     * @en Listen to the specified event
     */
    on<K extends keyof T>(event: K | '*', callback: ListenerCallback<T[K]>): Listener<T[K]>;
}
export {};
