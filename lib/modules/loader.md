# Loader

讓 Promise.all 可以透過更好的 UI 呈現。

## 如何使用

```ts
import { Loader } from 'power-helper'

type Data = {
    name: string
}

let user = null
let userLoader = new Loader<Data>('fetch user')

// 加入一個非同步載入
userLoader.push('fetch', async({ name }) => {
    user = await fetch(name)
})

userLoader.push('history', async({ name }) => {
    await addHistory(name)
})

console.log(userLoader.loading) // false

// 觸發並回傳 Promise
userLoader.start({
    name: 'dave'
})

console.log(userLoader.loading) // true
```

### Constructor

```ts
class Loader<Data> {
    constructor(name = 'no_name')
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 加入一個非同步事件 */
function push(name: string, handler: (data: any) => Promise<any>): void
/** 執行所有已註冊的事件 */
function start(data: any): Promise<any>
/** 重置 Loader 狀態，只有在 done 為 true 才能執行 */
function reset(): Loader
/** 註冊事件長度 */
const size: Readonly<number>
/** 已完成事件 */
const complete: Readonly<number>
/** 是否執行結束 */
const done: Readonly<boolean>
/** 是否錯誤，如果沒有則為 null */
const fail: Readonly<null | {
    isPowerHelperLoader: true
    name: string
    error: any
}>
/** 是否已經呼叫 */
const called: Readonly<boolean>
/** 是否正在加載 */
const loading: Readonly<boolean>
```

### Event

#### call

呼叫 `start` 時觸發。

```ts
const eventData: {}
```

#### done

成功結束所有事件後觸發。

```ts
const eventData: {}
```

#### complete

完成單一事件後觸發。

```ts
const eventData: {
    name: string
    result: any
    loaderName: string
}
```

#### fail

發生錯誤事件後觸發。

```ts
const eventData: {
    error: {
        isPowerHelperLoader: true
        name: string
        error: any
        loaderName: string
    }
}
```
