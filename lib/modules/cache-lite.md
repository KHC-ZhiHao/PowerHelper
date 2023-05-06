# Cache Lite

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/cache-lite.ts)

指定鍵值並同步的存取，非常近似 Map 物件，但是有 TTL(Time To Live)。

## 如何使用

```ts
import { CacheLite, flow } from 'power-helper'

let cacheLite = new CacheLite({
    expTime: 100
})

cacheLite.set('a', 'b')
console.log(cacheLite.get('a')) // b

await flow.sleep(500)

console.log(cacheLite.get('a')) // undefined
```

### Constructor

```ts
/**
 * @param {number} params.expTime 每筆資料的存活時間，超過則重取，單位:毫秒
 * @param {number} params.maxSize 最大 cache 數量，超過則先行移除舊的資料
 * @param {{
 *  set: (context: { key: string, value: any }) => { key: string, value: any }
 * }} params.intercept 攔截運作
 */
class CacheLite<T> {
    constructor(params: {
        expTime: number
        maxSize?: number
        intercept?: {
            set?: (_context: {
                key: string
                value: T
            }) => {
                key: string
                value: T
            }
        }
    })
}
```

### Property

```ts
/** 獲取目前 cache 的數量。 */
const size: readonly number

/** 清除 cache。 */
function clear(): void

/** 獲取目標。 */
function get(key: string): any | undefined

/** 設定目標 */
function set(key: string, value: any): any // value

/** 有無目標 */
function has(key: string): boolean

/** 清除目標 */
function remove(key: string): any

/** 有無目標 */
function keys(): string[]

/** 獲取值組 */
function values(): any[]
```
