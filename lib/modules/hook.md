# Hook

基礎的 Pub/Sub 的架構模塊，使用方法跟 Event 非常相似，僅存的差別在於 Hook 只接受並依照順序執行非同步函式。

## 如何使用

```ts
import { Hook } from 'power-helper'

type Channels = {
    update: {
        name: string
    }
}

const hook = new Hook<Channels>()

// 掛載非同步事件
hook.attach('update', async(data) => {
    // async something...
})

// 觸發並回傳 Promise
await hook.notify('update', {
    name: 'dave'
})
```

### Constructor

```ts
class Hook<Channels extends Record<string, Record<string, any>>> {
    constructor()
}
```

### Property

```ts
/** 發送資料至指定掛勾 */
function notify(channel: string, data: any): Promise<any>

/** 取消指定 ID 掛勾 */
function detach(channel: string, id: string): void

/** 掛勾指定頻道 */
function attach(channel: string, callback: (data: any, context: ListenerCallback) => void): Listener

/** 掛勾指定頻道，並將執行順序安排到最後 */
function attachAfter(channel: string, callback: (data: any, context: ListenerCallback) => void): Listener
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

type ListenerCallback<T> = (data: T, context: ListenerContext) => Promise<any>

type Listener<T> = {
    /** 唯一並隨機的 Listener ID */
    readonly id: number
    /** 一組可供當下 Listener 儲存的空白物件 */
    readonly state: Record<string, any>
    /** 監聽的頻道 */
    readonly channel: string
    /** 觸發這個監聽對象 */
    invoke: <T>(data: T): void
    /** 關閉這個 Listener */
    off(): void
}
```