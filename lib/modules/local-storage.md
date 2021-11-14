# Event

協助你在複雜的網頁應用程式中更安全的操作 LocalStorage。

## 如何使用

```ts
import { LocalStorage } from 'power-helper'

type Columns = {
    token: string
}

let localStorage = new LocalStorage<Columns>('my-storage')
localStorage.set('token', '12345')
```

### Constructor

```ts
class LocalStorage<Columns extends Record<string, any> {
    constructor(namespaces, options)
}
```

### Property

```ts
/** 獲取指定頻道的監聽數量 */
function getChannelListenerSize(channel: string): number

/** 發送資料至指定頻道 */
function emit(channel: string, data: any): void

/** 停止指定 ID 的監聽者 */
function off(channel: string, id: string): void

/** 監聽指定頻道 */
function on(channel: string, callback: (data: any, context: ListenerCallback) => void): Listener
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
    /** 監聽的頻道 */
    readonly channel: string
    /** 觸發這個監聽對象 */
    invoke: <T>(data: T): void
    /** 關閉這個 Listener */
    off(): void
}
```