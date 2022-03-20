# Schedule

可以建立多個定時執行系統，且能保證不重複執行。

## 如何使用

```ts
import { Schedule } from 'power-helper'
const schedule = new Schedule()
// 每 60 秒執行一次指定的 callback
schedule.add('my-first-schedule', 1000 * 60, async() => { ... })
```

## 不重複執行

計時器並不會在運行中計算，因此當每次執行的程序需要 120 秒，會導致下一次執行時間間隔是 180 秒。

```ts
import { Schedule } from 'power-helper'
const schedule = new Schedule()
schedule.add('my-first-schedule', 1000 * 60, async() => {
    await new Promise(done => {
        setTimeout(done, 1000 * 60 * 2)
    })
})
```

### Constructor

```ts
class Schedule {
    constructor()
}
```

### Property

```ts
/** 加入一個程序，不能重複已存在的命名 */
function add(name: string, intervalMs: number, callback: () => Promise<any>): void

/** 驗證程序是否存在 */
function has(name: string): boolean

/** 刪除指定的程序 */
function remove(name: string): void

/** 獲取現在所有正在運作的程序 */
function info(): Info[]

/** 暫停計時，正在運行中的程序不受限制 */
function stop(): void

/** 假如是暫停狀態可以透過 play 繼續計時 */
function play(): void

/** 關閉計時器 */
function close(): void
```

### Types

```ts
type Info = {
    /** 程序名稱 */
    name: string
    /** 運行當下時間，如果為 null 則尚未運行 */
    runningTime: number | null
    /** 執行次數 */
    executedCount: number
}
```
