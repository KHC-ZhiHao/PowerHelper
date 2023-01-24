# Job Queues

有限的批次執行作業。

## 如何使用

```ts
import { JobQueues, flow } from 'power-helper'

let flag = ''
let jq = new JobQueues({
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
/** 將一組 job 新增至最優先級 */
function unshift(name: string, job: () => Promise<any>): void
/** 清空現有的 jobs */
function clear(): Error
/** 關閉這組 queue ，將無效化 push, unshift，且清空現有的 jobs */
function close(): void
```

### Event

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
