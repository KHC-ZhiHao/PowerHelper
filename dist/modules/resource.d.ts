declare type ResourceSupport = string | File | Blob | MediaSource;
declare type ResourceParams = {
    def: (path: string) => string;
};
export declare class Resource {
    private params;
    constructor(params: ResourceParams);
    url(source: ResourceSupport): string;
    backgroundStyle(source: ResourceSupport): string;
}
export {};
