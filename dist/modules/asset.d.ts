import { Once } from './once';
export type AssetParams = {
    images: {
        [key: string]: string | (() => Promise<HTMLImageElement>);
    };
    audios: {
        [key: string]: string | (() => Promise<HTMLAudioElement>);
    };
};
/**
 * 資源載入工具，目的是初始化必要的靜態資源。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/asset.md
 */
export declare class Asset<T extends AssetParams> {
    _images: any;
    _audios: any;
    _onecLoad: Once<void>;
    loaded: boolean;
    params: T;
    constructor(params: T);
    static loadImage(src: string): Promise<HTMLImageElement>;
    static loadAudio(src: string): Promise<HTMLAudioElement>;
    load(): Promise<void>;
    getImage<K extends keyof T['images']>(key: K): HTMLImageElement;
    getAudio<K extends keyof T['audios']>(key: K): HTMLAudioElement;
    getImagePromise<K extends keyof T['images']>(key: K): Promise<HTMLImageElement>;
    getAudioPromise<K extends keyof T['audios']>(key: K): Promise<HTMLAudioElement>;
}
