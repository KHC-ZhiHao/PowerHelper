type QueryCollectionParams<T, R> = {
    /** 發出請求前蒐集資料的時間，單位: 毫秒 */
    waitTime: number;
    /** 請求方法 */
    query: (_collection: T[]) => Promise<R[]>;
};
/**
 * 可以蒐集資料並統一發出請求。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/query-collection.md
 */
export declare class QueryCollection<T, R> {
    private params;
    private timeout;
    private collection;
    constructor(params: QueryCollectionParams<T, R>);
    /**
     * 推送一筆資料進搜集器
     */
    push(data: T): Promise<R[]>;
}
export {};
