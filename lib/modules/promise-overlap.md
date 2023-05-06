# Promise Overlap

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/promise-overlap.ts)

狀態管理的情境下，位於為某種情境導致舊請求還沒成功就發送新的請求，在關聯效能有差異的情形下，可能會發生新請求比舊請求還早接受 commit 資料，造成狀態顯示不對，Promise Overlap 能夠控制同一種情境下指獲取第一次或是最後一次的結果。

## 如何使用

```ts
import { PromiseOverlap } from 'power-helper'
let count = 0
let add = async() => {
    count += 1
    return count
}
let promiseOverlap = new PromiseOverlap<number>('last')
// 注意，不論是 last 還是 first 每個 promise 都會運行。
let results = await Promise.all([
    promiseOverlap.run(add),
    promiseOverlap.run(add),
    promiseOverlap.run(add)
])
// 由於只取最後的值，所以回傳結果都是最後一筆資料
console.log(results) // [3, 3, 3]
```

### Constructor

```ts
/**
 * @param {'last' | 'first'} pick - 獲取目標
 * @param {object} [options]
 * @param {number} [options.delay = 1] - 執行緩衝時間
 */
class PromiseOverlap {
    constructor(pick, options)
}
```

### Property

```ts
/** 執行目標 promise */
function run(cb: () => Promise<any>): any
```
