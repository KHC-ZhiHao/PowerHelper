declare type Params<T> = {
    expTime: number;
    handler: T;
    maxSize?: number;
};
export declare class CacheLite<T extends (key: string) => any> {
    private params;
    private lastUpdate;
    private keyMap;
    constructor(params: Params<T>);
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
    /**
     * 清除指定 cache key
     */
    remove(key: string): void;
}
export {};
