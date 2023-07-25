# Asset

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/asset.ts)

資源載入工具，目的是初始化必要的靜態資源。

## 如何使用

```ts
import { Asset } from 'power-helper'

const asset = new Asset({
    images: {
        'test': 'https://picsum.photos/200/300'
    },
    audios: {
        'test': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    }
})

// output: boolean

await asset.load()
console.log(asset.getImage('test')) // HTMLImageElement
console.log(asset.getAudio('test')) // HTMLAudioElement 
```

### Constructor

```ts
/**
 * @param {params} params.images 圖片資源
 * @param {params} params.audios 音效資源
 */
class Asset {
    constructor(params: {
        images: {
            [key: string]: string | (() => Promise<HTMLImageElement>)
        },
        audios: {
            [key: string]: string | (() => Promise<HTMLAudioElement>)
        }
    })
}
```

### Static

```ts
/** 加載 image。 */
const loadImage: (src: string) => Promise<HTMLImageElement>

/** 加載 audio。 */
const loadAudio: (src: string) => Promise<HTMLAudioElement>
```

### Property

```ts
/** 加載預設的資源 */
function load(): Promise<void>

/** 獲取圖片，在未執行 load 之前會獲取到 undefined */
function getImage(name: string): HTMLImageElement

/** 獲取音效，在未執行 load 之前會獲取到 undefined */
function getAudio(name: string): HTMLAudioElement
```
