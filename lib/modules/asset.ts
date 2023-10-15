import { Once } from './once'
import { promiseAllWithKeys } from '../utils/record'

export type AssetParams = {
    images: {
        [key: string]: string | (() => Promise<HTMLImageElement>)
    }
    audios: {
        [key: string]: string | (() => Promise<HTMLAudioElement>)
    }
}

export class Asset<T extends AssetParams> {
    _images: any = {}
    _audios: any = {}
    _onecLoad = new Once({
        handler: async() => {
            const images: any = {}
            const audios: any = {}
            for (let key in this.params.images) {
                let value = this.params.images[key]
                let result = typeof value === 'string' ? Asset.loadImage(value) : value()
                images[key] = result
            }
            for (let key in this.params.audios) {
                let value = this.params.audios[key]
                let result = typeof value === 'string' ? Asset.loadAudio(value) : value()
                audios[key] = result
            }
            this._images = await promiseAllWithKeys(images)
            this._audios = await promiseAllWithKeys(audios)
            this.loaded = true
        }
    })
    loaded = false
    params: T
    constructor(params: T) {
        this.params = params
    }

    static async loadImage(src: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            let image = new Image()
            image.onload = () => resolve(image)
            image.onerror = reject
            image.src = src
        })
    }

    static async loadAudio(src: string) {
        return new Promise<HTMLAudioElement>((resolve, reject) => {
            let audio = new Audio()
            audio.onloadedmetadata = () => resolve(audio)
            audio.onerror = reject
            audio.src = src
        })
    }

    async load() {
        await this._onecLoad.run()
    }

    getImage<K extends keyof T['images']>(key: K) {
        return this._images[key] as any as HTMLImageElement
    }

    getAudio<K extends keyof T['audios']>(key: K) {
        return this._audios[key] as any as HTMLAudioElement
    }

    async getImagePromise<K extends keyof T['images']>(key: K) {
        await this.load()
        return this._images[key] as any as HTMLImageElement
    }

    async getAudioPromise<K extends keyof T['audios']>(key: K) {
        await this.load()
        return this._audios[key] as any as HTMLAudioElement
    }
}
