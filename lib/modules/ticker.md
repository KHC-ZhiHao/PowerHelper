# Ticker

就如同 setInterval (實際上也是) 一樣運作，只是你可以監聽好幾組事件。

## 如何使用

```ts
import { Ticker } from 'power-helper'
const ticker = new Ticker(1000)
// 以下事件會每 1 秒執行一次
ticker.on('next', ({ delta, timeGap }) => {
    console.log(delta) // delta 在每次呼叫的時候會加 1
    console.log(timeGap) // 由於單執行續的關係，並不會保證準確1秒運行，可以透過 timeGap 獲取上次到現在呼叫的時間
})
```

### Constructor

```ts
/**
 * @param {string} ms 多少毫秒執行一次
 * @param {object} [options]
 * @param {boolean} [options.autoPlay = true] - 是否預設為自動執行
 */
class Ticker {
    constructor(ms, options)
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 暫停 event 被呼叫 */
function stop(): void

/** 假如是暫停狀態可以透過 play 繼續定時執行 event */
function play(): void

/** 關閉 Interval 的執行 */
function close(): void
```

### Event

#### next

執行下一階段時觸發。

```ts
const eventData: {
    delta: number
    timeGap: number
}
```
