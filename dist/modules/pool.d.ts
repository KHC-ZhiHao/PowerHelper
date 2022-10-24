import { Cache } from './cache';
import { QueryCollection } from './query-collection';
declare type PoolParams<P, D> = {
    find: (_data: D, _params: P) => boolean;
    fetch: (_params: P[]) => Promise<D[]>;
    cache?: Omit<ConstructorParameters<typeof Cache<P, D>>[0], 'key' | 'pick'>;
    collection?: Omit<ConstructorParameters<typeof QueryCollection<P, D>>[0], 'query'>;
};
export declare class Pool<P, D> {
    private dataCache;
    private dataCollection;
    constructor({ find, fetch, cache, collection }: PoolParams<P, D>);
    pick(params: P): Promise<D>;
    list(paramsItems: P[]): Promise<Awaited<D>[]>;
    /** 清除指定 cache */
    remove(params: P): void;
    /** 清空 cache */
    clear(): void;
}
export {};
