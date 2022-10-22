# Resource

更優雅的實現獲取檔案路徑。

## 如何使用

```ts
import { Resource } from 'power-helper'
const imageResource = new Resource({
    def: path => `images/${path}`
})

// 當來源不是標準的 url 時，採用 def
// output: images/banana.jpg
imageResource.url('banana.jpg')

// 當來源是標準的 url 時
// output: https://myhost.banana.jpg
imageResource.url('https://myhost.banana.jpg')
```

### Constructor

```ts
class Resource {
    constructor(params: {
        def: (path: string) => string
    })
}
```

### Property

```ts
/** 獲取資源 url */
function url(source: string | File | Blob | MediaSource): string

/** 將 url 轉換成 css style  */
function backgroundStyle(source: string | File | Blob | MediaSource): `background-image: url(${string})`

/** 如果取用過 File, Blob, MediaSource 等型態的 Url，需要釋放現有的快取資源 */
function release(): void
```
