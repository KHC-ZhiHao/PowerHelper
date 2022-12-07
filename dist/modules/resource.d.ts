import { Event } from './event';
declare type Items = Record<string, (data: any) => string>;
declare type ResourceSupport = string | File | Blob | MediaSource;
declare type ResourceParams<I extends Items> = {
    def: (_path: string) => string;
    items?: I;
};
declare type Channels = {
    fetch: {
        url: string;
        source: ResourceSupport;
        isObjectUrl: boolean;
    };
};
export declare class Resource<I extends Items> extends Event<Channels> {
    private objectUrls;
    private params;
    constructor(params: ResourceParams<I>);
    private createObjectUrl;
    /** 獲取已編寫好案例的 items 資源，回傳的字串是經過 url 編譯後的結果 */
    get<T extends keyof I>(name: T, ...data: Parameters<I[T]>[0] extends undefined ? [] : [Parameters<I[T]>[0]]): string;
    /** 獲取資源 url */
    url(source: ResourceSupport): string;
    /** 如果取用過 File, Blob, MediaSource 等型態的 Url，需要釋放現有的記憶體資源 */
    release(): void;
    /** 將 url 轉換成 css style  */
    backgroundStyle(source: ResourceSupport): string;
}
export {};
