# Flow

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.ts)

流程控制的工具。

```ts
import { flow } from 'power-helper'
```

---

## Methods

### run

直接運行方法並返回結果。

```ts
function<T extends () => any>(cb: T): ReturnType<T> 
```

#### example

```ts
const result = flow.run(() => 10)
console.log(result)
/*
    outputs: 10
*/
```

---

### sleep

停止執行指定時間(毫秒)。

```ts
function(ms: number): Promise<any>
```

#### example

```ts
// 等待一秒
await flow.sleep(1000)
```

---

### asyncWhile

結合非同步與計數的迴圈操作。

```ts
type CallbackContext = {
    /** 現在迴圈執行的次數 */
    count: number
    /** 執行後將跳出迴圈 */
    doBreak: () => void
}
type Callback = (context: CallbackContext) => Promise<any>
function(callback: Callback): Promise<any>
```

#### example

```ts
// 當 count 累積到十以上後跳出執行迴圈
await flow.asyncWhile(async({ count, doBreak }) => {
    if (count >= 10) {
        return doBreak()
    } else {
        // do something...
    }
})
```

---

### createUuid

建立一組隨機的 v4 uuid。

```ts
function(): string
```

#### example

```ts
const uuid = flow.createUuid()
console.log(uuid)
/*
    outputs: 'xxxxxxxx-xxxx-xxxx....'
*/
```

---

### createWithTsUuid

建立一組隨機的 v4 uuid，但在前面加上當下的 timestamp(ms)。

```ts
function(): string
```

#### example

```ts
const uuid = flow.createWithTsUuid()
console.log(uuid)
/*
    outputs: '123456789-xxxxxxxx-xxxx-xxxx....'
*/
```

---

### randomInt

求整數範圍內的隨機值。

```ts
function(min: number, max: number): number
```

#### example

```ts
const int = flow.randomInt(1, 3)
console.log(int)
/*
    outputs: 1 | 2 | 3
*/
```

---

### retry

優雅的設計有限的重複執行直到成功為止。

```ts
function<T>(params: {
    /**
     * 最大重複次數
     * @default 1
     */
    max?: number
    /**
     * 錯誤時呼叫此事件
     */
    onFail?: (index: number, error: any) => void
    /**
     * 每次錯誤重試間格的等待時間(毫秒)
     * @default 0
     */
    interval?: number
    /** 執行過程，回傳 resolve 為成功， reject 為失敗進入下一次重試 */
    action: (index: number) => Promise<T>
}): Promise<T>
```

#### example

```ts
const result = await flow.retry({
    max: 3,
    action: async(count) => {
        if (count >= 2) {
            return 'success'
        }
        throw 'fail'
    }
})
console.log(result)
/*
    outputs: 'success'
*/
```

---

### waitFor

等待直到條件成立，如果都沒有完成任何條件，就等待間隔時間。

```ts
function<T>(params: {
    /**
     * 每次檢查的間隔時間(毫秒)
     */
    ms: number
    /**
     * 檢查是否完成的方法
     */
    fn: (_resolve: (_value: T) => void, _reject: (_error: any) => void) => Promise<void>
}): Promise<T>
```

#### example

```ts
const result = await flow.waitFor({
    ms: 1000,
    fn: (resolve, reject) => {
        if (true) {
            resolve('success')
        } else {
            reject('fail')
        }
    }
})
```
