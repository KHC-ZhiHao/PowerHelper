import { Event } from './event';
declare type PickContext = {
    key: string;
};
declare type Pick<P, R> = (params: P, context: PickContext) => Promise<R>;
declare type Channels<T> = {
    remove: {
        data: T;
    };
};
export declare class Cache<P, R> extends Event<Channels<R>> {
    private event;
    private key;
    private pick;
    private keepAlive;
    private items;
    constructor(params: {
        /** 將參數轉換成唯一鍵 */
        key: (params: P) => string;
        /** 如果鍵值不存在則如何獲取資料 */
        pick: Pick<P, R>;
        /** 每筆資料的存活時間，超過則重取，單位:毫秒 */
        keepAlive?: number;
    });
    /** 獲取所有的 Cache 鍵值 */
    keys(): string[];
    /** 清空所有 Cache。 */
    clear(): void;
    /** 刪除指定參數的 Cache。 */
    remove(params: P): void;
    /** 清除過期的 Cache。 */
    removeExpired(): void;
    private removeByKey;
    /** 直接設定指定參數的值。 */
    set(params: P, data: R): void;
    private setByKey;
    /** 獲取指定參數的值。 */
    get(params: P): Promise<R>;
}
export {};
