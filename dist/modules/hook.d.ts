type ListenerContext = {
    /** 唯一並隨機的 Listener ID */
    id: string;
    /** 關閉這個 Listener  */
    off: () => void;
    /** 一組可供當下 Listener 儲存的空白物件 */
    state: Record<string, any>;
};
type ListenerCallback<T> = (data: T, context: ListenerContext) => Promise<void>;
declare class Listener<T> {
    /** 唯一並隨機的 Listener ID */
    readonly id: string;
    /** 一組可供當下 Listener 儲存的空白物件 */
    readonly state: Record<string, any>;
    /** 監聽的頻道 */
    readonly channel: string;
    private callback;
    private manager;
    isAfter: boolean;
    constructor(manager: Hook<any>, channel: string, callback: ListenerCallback<any>);
    /** 觸發這個監聽對象 */
    invoke(data: T): Promise<void>;
    /** 關閉這個 Listener */
    off(): void;
}
/**
 * 為非同步而生的 Pub/Sub 的架構模塊，使用方法跟 Event 非常相似，僅存的差別在於 Hook 只接受並依照順序執行非同步函式。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/hook.md
 */
export declare class Hook<T extends Record<string, Record<string, any>>> {
    private listeners;
    /** 發送資料至指定頻道 */
    notify<K extends keyof T>(channel: K, data: T[K]): Promise<void>;
    /** 取消指定 ID 掛勾 */
    detach<K extends keyof T>(channel: K, id: string): void;
    /** 掛勾指定頻道 */
    attach<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>): Listener<T[K]>;
    /** 掛勾指定頻道，且無論註冊時間如何，永遠會在最後執行 */
    attachAfter<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>): Listener<T[K]>;
}
export {};
