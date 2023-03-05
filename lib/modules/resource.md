# Resource

優雅的實現獲取檔案路徑。

## 如何使用

```ts
import { Resource } from 'power-helper'
const imageResource = new Resource({
    def: path => `images/${path}`,
    items: {
        logo(data: 'google' | 'apple') {
            return data === 'google' ? 'google.png' : 'apple.png'
        }
    }
})

// 當來源不是標準的 url 時，採用 def
// output: images/banana.jpg
imageResource.url('banana.jpg')

// 當來源是標準的 url 時
// output: https://myhost.banana.jpg
imageResource.url('https://myhost.banana.jpg')

// 可以透過 get 來獲取已定義好的 items 檔案，也更有利對 ts 的加強。
// output: images/google.png
imageResource.get('logo', 'google')
```

### Constructor

```ts
class Resource {
    constructor(params: {
        def: (path: string) => string
        items?: Record<string, (data: unknown) => string>
    })
}
```

### Property

```ts
/** 獲取已編寫好案例的 items 資源，回傳的字串是經過 url 編譯後的結果 */
function get(name: string): string

/** 獲取資源 url */
function url(source: string | File | Blob | MediaSource): string

/** 將 url 轉換成 css style，當 mode 為 cover 的時候會協助加入其他背景屬性  */
function backgroundStyle(source: string | File | Blob | MediaSource, mode?: 'basic' | 'cover'): string

/** 如果取用過 File, Blob, MediaSource 等型態的 Url，需要釋放現有的記憶體資源 */
function release(): void
```
