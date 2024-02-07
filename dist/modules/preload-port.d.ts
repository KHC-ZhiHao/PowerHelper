import { CacheLite } from './cache-lite';
/**
 * 可以預先載入資料並透過 id 傳遞給需要的對象。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/preload-port.md
 */
export declare class PreloadPort<I, O> {
    _cache: CacheLite<Promise<O>>;
    _handler: (data: I) => Promise<O>;
    constructor(params: {
        ttl?: number;
        handler: (data: I) => Promise<O>;
    });
    create(data: I): string;
    remove(id: string): void;
    clear(): void;
    get(id: string | null | undefined, data: I): Promise<O>;
}
