import { Once } from './once';
export declare type AssetParams = {
    images: {
        [key: string]: string | (() => Promise<HTMLImageElement>);
    };
    audios: {
        [key: string]: string | (() => Promise<HTMLAudioElement>);
    };
};
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
}
