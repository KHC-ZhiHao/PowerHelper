# Preload Port

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/preload-port.ts)

可以預先載入資料並透過 id 傳遞給需要的對象。

## 如何使用

```ts
import { PreloadPort } from 'power-helper'

const data = new PreloadPort({
    handler: async(params) => {
        return {
            username: params.name
        }
    }
})

const id = data.create({
    name: 'dave'
})

// 第二個參數是如果運行的 id 不存在時，應該如何執行
const user = await data.get(id, {
    name: 'james'
})

console.log(user)

/*
    outputs: { username: 'dave' }
*/
```

### Constructor

```ts
class PreloadPort<Params, Data> {
    constructor(params: {
        ttl?: number
        handler: (params: Params) => Promise<Data>
    })
}
```

### Property

```ts
/** 建立預先載入的id，此時 handler 就會運行 */
create(params: any): string
/** 獲取資料 */
get(id: string, params: any): Promise<Data>
/** 刪除資料 */
remove(id: string): void
/** 清除所有資料 */
clear(): void
```
