# Cache

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/cache.ts)

可以將指定參數請求進行有期限的固定資料存取。

## 如何使用

以下示範如何透過使用者名稱作為鍵值，嘗試進行複數請求的情境。

```ts
import { Cache } from 'power-helper'
type Params = {
    name: string
}
type Response = {
    age: number
}
let age = 0
let cache = new Cache<Params, Response>({
    // 透過 key function 來組成 cache 的唯一性
    key: params => params.name,
    pick: async params => {
        age += 1
        return {
            age
        }
    }
})
let user = await cache.get({
    name: 'dave'
})
console.log(user.age) // 1
// 再次獲取 dave 則會獲取到上次執行的成果。
let user2 = await cache.get({
    name: 'dave'
})
console.log(user2.age) // 1
// 改請求 john 則會重新發出請求，因為鍵值不同。
let user3 = await cache.get({
    name: 'john'
})
console.log(user3.age) // 2
```

### 平行請求

如果平行發出相同鍵值的請求，也只會發出第一次，其他等待的請求會等待第一次呼叫的結果：

```ts
import { Cache, flow } from 'power-helper'
type Params = {
    name: string
}
type Response = {
    age: number
}
let age = 0
let cache = new Cache<Params, Response>({
    key: params => params.name,
    pick: async params => {
        age += 1
        await flow.sleep(1000)
        return {
            age
        }
    }
})
let [r1, r2] = await Promise.all([
    cache.get({ name: 'dave' }),
    cache.get({ name: 'dave' })
])
console.log(r1 === r2) // true
```

### Constructor

```ts
/**
 * @param {object} params
 * @param {(params: Params) => string} params.key 將參數轉換成唯一鍵
 * @param {(params: Params, context: PickContext) => Response} params.pick 如果鍵值不存在則如何獲取資料
 * @param {number} [params.ttl = Infinity] 每筆資料的存活時間，超過則重取，單位:毫秒
 * @param {number} [params.maxSize = Infinity] 最多存取幾筆資料，超過則會刪除最舊的資料
 */
class Cache<Params, Response> {
    constructor(params)
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 獲取目前所有 Cache 的鍵值。 */
function keys(): string[]

/** 獲取 Cache 的資料長度 */
function size(): number

/** 清空所有 Cache。 */
function clear(): void

/** 刪除指定參數的 Cache。 */
function remove(params: Params): void

/** 直接設定指定參數的值。 */
function set(params: Params, value: Response): void

/** 獲取指定參數的值。 */
function get(params: Params): Response

/** 手動清除過期的 Cache */
function removeExpired(): void
```

### Types

```ts
type PickContext = {
    key: string
}
```

### Events

#### remove

當 Cache 被取代、過期、手動移除或是執行 clear 時都會觸發。

```ts
const eventData: {
    data: Response
}
```
