# Debounce

去抖動功能，通常用於搜尋欄不過度請求。

## 如何使用

```ts
import { Debounce } from 'power-helper'

let debounce = new Debounce<number>({
    // 如果200毫秒內沒有觸發 input，則觸發 trigger 並結束當下計算直到下次觸發 input 重新計算
    delay: 200
})
debounce.on('trigger', ({ values }) => {
    console.log(values) // [1, 2]
})
debounce.input(1)
debounce.input(2)
```

### Constructor

```ts
/**
 * @param {object} params
 * @param {number} [params.delay] 等待超時時間，單位:毫秒
 * @param {number} [params.totalDuration] 如果超過這個時間則無論如何都觸發 trigger，單位:毫秒
 * @param {number} [params.maxValueLength] 存取資料超過指定長度時觸發
 */
class Debounce<InputValue> {
    constructor(params)
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 加入一組值，並且 delay 重新計算。 */
function input(value: any): void
/** 不須等待直接觸發事件。 */
function trigger(): void
/** 終止現在正在運行的 input */
function close(): void
```

### Event

#### trigger

當條件符合時觸發此事件。

```ts
const eventData: {
    values: any[]
}
```
