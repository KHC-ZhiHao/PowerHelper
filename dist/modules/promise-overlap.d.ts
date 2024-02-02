type Pick = 'first' | 'last';
type Options = {
    delay?: number;
};
/**
 * 狀態管理的情境下，位於為某種情境導致舊請求還沒成功就發送新的請求，在關聯效能有差異的情形下，可能會發生新請求比舊請求還早接受 commit 資料，造成狀態顯示不對，Promise Overlap 能夠控制同一種情境下指獲取第一次或是最後一次的結果。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/promise-overlap.md
 */
export declare class PromiseOverlap<T> {
    private pick;
    private options;
    private processes;
    constructor(pick: Pick, options?: Options);
    /** 執行目標 promise */
    run(cb: () => Promise<T>): Promise<T>;
}
export {};
