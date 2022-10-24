export declare class CacheLite<T extends (key: string) => any> {
    private expTime;
    private handler;
    private lastUpdate;
    private keyMap;
    /**
     * @param expTime 過期時間
     */
    constructor(expTime: number, cb: T);
    private gc;
    /**
     * 獲取目前 Cache 的量
     */
    getSize(): number;
    /**
     * 清除 cache
     */
    clear(): void;
    /**
     * 獲取目標
     */
    get(key?: string): ReturnType<T>;
}
