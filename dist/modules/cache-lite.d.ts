declare type Context<T> = {
    key: string;
    value: T;
};
declare type Params<T> = {
    expTime: number;
    maxSize?: number;
    intercept?: {
        set?: (_context: Context<T>) => Context<T>;
    };
};
export declare class CacheLite<T> {
    private params;
    private lastUpdate;
    private keyMap;
    constructor(params: Params<T>);
    private gc;
    /**
     * 獲取目前 Cache 的量
     */
    get size(): number;
    /**
     * 清除 cache
     */
    clear(): void;
    /**
     * 獲取目標
     */
    get(key: string): undefined | T;
    /**
     * 設定目標
     */
    set(key: string, value: T): T;
    /**
     * 有無目標
     */
    has(key: string): boolean;
    /**
     * 刪除目標
     */
    remove(key: string): void;
    /**
     * 獲取鍵組
     */
    keys(): string[];
    /**
     * 獲取值組
     */
    values(): T[];
}
export {};
