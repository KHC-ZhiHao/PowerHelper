import { Event } from './event';
declare type Channels = {
    fail: {
        error: any;
        message: string;
    };
};
declare type Options = {
    defaultError: () => string;
    parseMessage: (error: any) => string | null;
};
export declare class Exception extends Event<Channels> {
    private serviceName;
    private parent;
    private options;
    constructor(serviceName: string, options?: Partial<Options>);
    static get basicMessageParser(): (data: any) => string | null;
    protected _setParent(serviceException: Exception): void;
    protected _getParents(): Exception[];
    private get fullName();
    /** 解析錯誤訊息 */
    parseMessage(data: any): string;
    /** 建立一個 Error */
    create(error: any): Error;
    /** 切出一個 exception，有利於上下文追蹤 */
    checkout(childName: string): Exception;
}
export {};
