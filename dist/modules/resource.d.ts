import { Event } from './event';
type Items = Record<string, (data: any) => string>;
type ResourceSupport = string | File | Blob | MediaSource;
type ResourceParams<I extends Items> = {
    def: (_path: string) => string;
    items?: I;
};
type Events = {
    fetch: {
        url: string;
        source: ResourceSupport;
        isObjectUrl: boolean;
    };
};
/**
 * 優雅的實現獲取檔案路徑。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/resource.md
 */
export declare class Resource<I extends Items> extends Event<Events> {
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
    /** 將 url 轉換成 css style，當 mode 為 cover 的時候會協助加入其他背景屬性  */
    backgroundStyle(source: ResourceSupport, mode?: 'basic' | 'cover'): string;
}
export {};
