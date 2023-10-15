import { expect } from 'chai'
import { Asset } from './asset'

// @ts-ignore
global.Image = class Image {
    onload: any = () => null
    onerror: any
    src: any
    constructor() {
        setTimeout(() => {
            this.onload()
        }, 100)
    }
}

// @ts-ignore
global.Audio = class Audio {
    onloadedmetadata: any = () => null
    onerror: any
    src: any
    constructor() {
        setTimeout(() => {
            this.onloadedmetadata()
        }, 100)
    }
}

describe('Asset', () => {
    it('image', async function() {
        let asset = new Asset({
            images: {
                ouo: 'ouo',
                ouo2: async() => {
                    return new global.Image()
                }
            },
            audios: {}
        })
        expect(asset.getImage('ouo')).eq(undefined)
        await asset.load()
        expect(asset.getImage('ouo')).instanceOf(global.Image)
        expect(asset.getImage('ouo2')).instanceOf(global.Image)
    })
    it('audio', async function() {
        let asset = new Asset({
            images: {
                ouo: 'ouo'
            },
            audios: {
                x_x: 'x_x',
                x_x2: async() => {
                    return new global.Audio()
                }
            }
        })
        expect(asset.getAudio('x_x')).eq(undefined)
        await asset.load()
        expect(asset.getAudio('x_x')).instanceOf(global.Audio)
        expect(asset.getAudio('x_x2')).instanceOf(global.Audio)
    })
    it('promise image', async function() {
        let asset = new Asset({
            images: {
                ouo: 'ouo',
                ouo2: async() => {
                    return new global.Image()
                }
            },
            audios: {}
        })
        expect(asset.getImage('ouo')).eq(undefined)
        expect(await asset.getImagePromise('ouo')).instanceOf(global.Image)
        expect(asset.getImage('ouo2')).instanceOf(global.Image)
    })
    it('promise audio', async function() {
        let asset = new Asset({
            images: {
                ouo: 'ouo'
            },
            audios: {
                x_x: 'x_x',
                x_x2: async() => {
                    return new global.Audio()
                }
            }
        })
        expect(asset.getAudio('x_x')).eq(undefined)
        expect(await asset.getAudioPromise('x_x')).instanceOf(global.Audio)
        expect(asset.getAudio('x_x2')).instanceOf(global.Audio)
    })
})
