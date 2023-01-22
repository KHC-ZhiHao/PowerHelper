# Cache Lite

指定鍵值並同步的存取，非常近似 Map，但是有 TTL。

## 如何使用

```ts
import { CacheLite } from 'power-helper'

let flag = 0
let cacheLite = new CacheLite({
    expTime: 100,
    handler: () => {
        flag += 1
        return flag
    }
})

console.log(cacheLite.get('a')) // 1
console.log(cacheLite.get('b')) // 2
console.log(cacheLite.get('a')) // 1
```

### Constructor

```ts
/**
 * @param {number} params.expTime 每筆資料的存活時間，超過則重取，單位:毫秒
 * @param {(key: string) => any} params.handler 如果查無資料則運行後回傳
 * @param {[number]} params.maxSize 最大 cache 數量，超過則先行移除舊的資料
 */
class CacheLite {
    constructor(params: {
        expTime: number
        handler: (key: string) => any
        maxSize?: number
    })
}
```

### Property

```ts
/** 獲取目前 cache 的數量。 */
function getSize(): number

/**  清除 cache。 */
function clear(): void

/** 獲取目標。 */
function get(key: string): any

/** 清除指定 cache key */
function remove(key: string): any
```
