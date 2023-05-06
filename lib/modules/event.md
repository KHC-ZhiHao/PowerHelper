# Event

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/event.ts)

## 如何使用

```ts
import { Event } from 'power-helper'
type Events = {
    update: {
        name: string
    }
}
const emitter = new Event<Events>()
emitter.on('update', (data) => {
    console.log(data.name) // dave
})
// 透過 * 可以全局監聽
emitter.on('*', ({ event, data }) => {
    console.log(data.name) // dave
})
emitter.emit('update', {
    name: 'dave'
})
```

### Constructor

```ts
class Event<Events extends Record<string, Record<string, any>>> {
    constructor()
}
```

### Property

```ts
/** 獲取指定事件的監聽數量 */
function getEventListenerSize(event: string): number

/** 發送資料至指定事件 */
function emit(event: string, data: any): void

/** 停止指定 ID 的 Listener */
function off(event: string, id: string): void

/** 監聽指定事件 */
function on(event: string, callback: (data: any, context: ListenerCallback) => void): Listener
```

## Types

```ts
type ListenerContext = {
    /** 唯一並隨機的 Listener ID */
    id: string
    /** 關閉這個 Listener */
    off: () => void
    /** 一組可供當下 Listener 儲存的空白物件 */
    state: Record<string, any>
}

type ListenerCallback<T> = (data: T, context: ListenerContext) => void

type Listener<T> = {
    /** 唯一並隨機的 Listener ID */
    readonly id: number
    /** 一組可供當下 Listener 儲存的空白物件 */
    readonly state: Record<string, any>
    /** 監聽的事件 */
    readonly event: string
    /** 觸發這個監聽對象 */
    invoke: <T>(data: T): void
    /** 關閉這個 Listener */
    off(): void
}
```