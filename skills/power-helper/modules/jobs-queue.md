# Jobs Queue

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/jobs-queue.ts)

有限的批次執行作業。

## 如何使用

```ts
import { JobsQueue, flow } from 'power-helper'

let flag = ''
let jq = new JobsQueue({
    autoPlay: true, // default: true
    concurrentExecutions: 1
})
jq.push('123', async() => {
    await flow.sleep(10)
    flag += '1'
})
jq.push('123', async() => {
    await flow.sleep(20)
    flag += '2'
})
jq.unshift('123', async() => {
    await flow.sleep(20)
    flag += '3'
})
jq.on('allDone', () => {
    console.log(flag)
    /*
        outputs: 132
    */
})
```

### 搭配 Loader 進行批量控制

由於 Loader 是基於 Promise.all 設計，會一口氣併發所有函數，因此無法控制同時執行的數量，與中斷流程，這時候可以搭配 JobsQueue 來達成。

```ts
import { Loader, JobsQueue, flow } from 'power-helper'

const loader = new Loader()
const job = new JobsQueue({
    concurrentExecutions: 1
})
loader.on('clear', () => job.clear())
loader.push('process 1', async() => job.pushAndWait('process 1', async() => {
    // do something
}))
loader.push('process 2', async() => job.pushAndWait('process 2', async() => {
    // do something
}))
loader.push('process 3', async() => job.pushAndWait('process 3', async() => {
    // do something
}))
loader.clear()
```

### Constructor

```ts
class JobsQueue {
    constructor(params: {
        // 是否自動開始執行
        autoPlay: boolean
        // 同時可運行的 job 數量
        concurrentExecutions: number
    })
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 現有的 jobs 長度 */
const size: number
/** 增加一個階段訊息 */
function push(name: string, job: () => Promise<any>): void
/** 將一組 job 新增至 queue 末端，同時回應一組 promise 可以等待直到該任務完成為止。 */
function pushAndWait(name: string, job: () => Promise<any>): Promise<null>
/** 將一組 job 新增至最優先級 */
function unshift(name: string, job: () => Promise<any>): void
/** 清空現有的 jobs */
function clear(): Error
/** 關閉這組 queue ，將無效化 push, unshift，且清空現有的 jobs */
function close(): void
/** 開始執行 jobs */
function play(): void
/** 暫停執行 jobs */
function stop(): void
```

### Events

#### error

當 job 擲出 exception 時觸發。

```ts
const eventData: {
    name: string
    error: any
}
```

#### allDone

最後一個 job 完成時觸發。

```ts
const eventData: unknow
```
