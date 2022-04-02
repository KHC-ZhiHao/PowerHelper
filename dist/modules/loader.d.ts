import { Event } from './event';
declare type FailError = {
    isPowerHelperLoader: true;
    name: string;
    error: any;
};
declare type Channels = {
    call: {};
    done: {};
    fail: {
        error: FailError;
    };
    complete: {
        name: string;
        result: any;
    };
};
export declare class Loader<T> extends Event<Channels> {
    private items;
    private status;
    get size(): number;
    get complete(): number;
    get done(): boolean;
    get fail(): FailError | null;
    get called(): boolean;
    get loading(): boolean;
    /** 加入一個非同步事件 */
    push(name: string, handler: (data: T) => Promise<any>): void;
    /** 執行所有已註冊的事件 */
    start(data: T): Promise<Array<{
        name: string;
        result: any;
    }>>;
}
export {};
