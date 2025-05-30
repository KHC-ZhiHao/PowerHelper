type Params<T> = {
    handler: () => Promise<T>;
};
/**
 * 限制只執行一次的非同步程式
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/once.md
 */
export declare class Once<T> {
    private isDone;
    private isError;
    private event;
    private response;
    private params;
    constructor(params: Params<T>);
    /** 執行程式 */
    run(): Promise<T>;
    /** 重置狀態 */
    reset(): void;
}
export {};
