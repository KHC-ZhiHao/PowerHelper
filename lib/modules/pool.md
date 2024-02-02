# Pool

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/pool.ts)

輕鬆發出請求與快取請求資料的資料池。

## 如何使用

```ts
import { Pool } from 'power-helper'

type Params = {
    name: string
}

type Response = {
    name: string
    age: number
}
const userPool = new Pool<Params, Response>({
    // 當資料回傳時，應該如何
    find: (data, params) => {
        return data.name === params.name
    },
    // 如果現在池沒有資料，可以透過 fetch 方法發出請求
    fetch: async(paramsList) => {
        return getUsersByNames(paramsList.map(e => e.name))
    }
})

const user = await userPool.pick({
    name: 'dave'
})

// dave
console.log(user.name)
```

### Constructor

```ts
class Pool<Params, Data> {
    constructor(params: {
        find: (data: Data, params: Params, index: number) => boolean
        fetch: (params: Params[]) => Promise<Data[]>
        cache?: {
            maxSize?: number
            ttl?: number
        }
        collection?: {
            waitTime?: number
        }
    })
}
```

### Property

```ts
/** 獲取資料 */
function pick(params: any): any
/** 批次獲取資料 */
function list(paramsItems: any[]): any[]
/** 清除指定 cache */
function remove(params: any): void
/** 清空 cache */
function clear(params: any): void
```
