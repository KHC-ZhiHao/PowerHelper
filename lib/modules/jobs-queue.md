# Jobs Queue

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/jobs-queue.ts)

有限的批次執行作業。

## 如何使用

```ts
import { JobsQueue, flow } from 'power-helper'

let flag = ''
let jq = new JobsQueue({
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

### Constructor

```ts
class Interaction {
    constructor(params: {
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
