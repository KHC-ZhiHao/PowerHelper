import { Event } from './event';
declare type ResourceSupport = string | File | Blob | MediaSource;
declare type ResourceParams = {
    def: (_path: string) => string;
};
declare type Channels = {
    fetch: {
        url: string;
        source: ResourceSupport;
        isObjectUrl: boolean;
    };
};
export declare class Resource extends Event<Channels> {
    private objectUrls;
    private params;
    constructor(params: ResourceParams);
    private createObjectUrl;
    url(source: ResourceSupport): string;
    release(): void;
    backgroundStyle(source: ResourceSupport): string;
}
export {};
