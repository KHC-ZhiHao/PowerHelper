import { Base } from '../module-base';
declare type PickContext = {
    key: string;
};
declare type Pick<P, R> = (params: P, context: PickContext) => Promise<R>;
export declare class Cache<P, R> extends Base {
    private event;
    private key;
    private pick;
    private keepAlive;
    private items;
    constructor(params: {
        key: (params: P) => string;
        pick: Pick<P, R>;
        keepAlive?: number;
    });
    /** 獲取所有的 Cache 鍵值 */
    keys(): string[];
    /** 清空所有 Cache。 */
    clear(): void;
    /** 刪除指定參數的 Cache。 */
    remove(params: P): void;
    private removeByKey;
    /** 直接設定指定參數的值。 */
    set(params: P, data: R): void;
    private setByKey;
    /** 獲取指定參數的值。 */
    get(params: P): Promise<R>;
}
export {};
