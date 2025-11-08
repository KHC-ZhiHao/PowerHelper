import { Event } from './event.js';
type FailError = {
    isPowerHelperLoader: true;
    name: string;
    error: any;
    loaderName: string;
};
type Events = {
    call: Record<string, unknown>;
    done: Record<string, unknown>;
    clear: Record<string, unknown>;
    fail: {
        error: FailError;
    };
    complete: {
        name: string;
        result: any;
        loaderName: string;
    };
};
/**
 * 可以搜集並發出多個 Promise 的加載元件，且擁有多種狀態。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/loader.md
 */
export declare class Loader<T> extends Event<Events> {
    private name;
    private items;
    private status;
    constructor(name?: string);
    get size(): number;
    get complete(): number;
    get done(): boolean;
    get fail(): FailError | null;
    get called(): boolean;
    get loading(): boolean;
    /** 清空所有非同步事件 */
    clear(): void;
    /** 加入一個非同步事件 */
    push(name: string, handler: (_data: T) => Promise<any>): void;
    /** 重置 Loader 狀態，只有在 done 為 true 才能執行 */
    reset(): this;
    /** 執行所有已註冊的事件 */
    start(data: T): Promise<Array<{
        name: string;
        result: any;
    }>>;
}
export {};
