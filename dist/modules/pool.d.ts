declare type PoolParams<P, D> = {
    find: (_data: D, _params: P) => boolean;
    fetch: (_params: P[]) => Promise<D[]>;
    cache?: {
        keepAlive?: number;
        maxSize?: number;
    };
    collection?: {
        waitTime?: number;
    };
};
export declare class Pool<P, D> {
    private dataCache;
    private dataCollection;
    constructor({ find, fetch, cache, collection }: PoolParams<P, D>);
    /** 獲取資料 */
    pick(params: P): Promise<D>;
    /** 批次獲取資料 */
    list(paramsItems: P[]): Promise<Awaited<D>[]>;
    /** 清除指定 cache */
    remove(params: P): void;
    /** 寫入資料 */
    set(params: P, data: D): void;
    /** 清空 cache */
    clear(): void;
}
export {};
