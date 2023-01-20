# WebSocketClient

更高階的 WebSocket 模塊，你可以透過 onMessage 監聽伺服器方的訊息，並透過 event system 發送給其他監聽對象。

## 如何使用

```ts
import { WebSocketClient } from 'power-helper'
const wsc = new WebSocketClient({
    url: () => 'ws://xxxx',
    onMessage: async(event) => {
        let { channel, data } = JSON.parse(event.data)
        wsc.emit(channel, data)
    },
    // return 的值等同於發送出去的格式
    sendHandler: async(channel, data) => {
        return JSON.stringify({
            data,
            channel
        })
    }
})
wsc.connect().then(() => {
    wsc.send('init', { ... })
})
```

### Constructor

```ts
/**
 * @param {object} params
 * @param {string} params.url 連線網址
 * @param {any} [params.system] 指定運行的 WebSocket 環境，假如你想應用在 NodeJs 上必須設定此參數
 * @param {string[]} [params.protocol] 指定運行的 WebSocket Protocol
 * @param {(event: any) => Promise<any>} params.onMessage 接收到資料要執行什麼事
 * @param {(channel: string, data: any) => Promise<any>} params.sendHandler 發送資料前進行資料轉換
 */
class WebSocketClient<Pub, Channels> {
    constructor(params{
        url:() => string,
        system?: typeof WebSocket,
        protocol?: string[],
        onMessage: (event: MessageEvent) => Promise<any>,
        sendHandler: <K extends keyof Pub>(channel: K, data: P[K]) => Promise<any>
    })
}
```

### Property

Extends: [Event](./event.md)

```ts
/* 現在的連線狀態 */
function getStatus(): string
/* 發送資料至伺服器 */
function send(channel: string, data: any): Promise<any>
/* 連接至伺服器 */
function connect(): Promise<any>
/* 斷開伺服器連線 */
function disconnect(): void
```

### Event

#### $open

成功連接伺服器時觸發。

```ts
const eventData: {}
```

#### $error

連接失敗等狀態等觸發。

```ts
const eventData: {
    from: 'unknown' | 'send' | 'message'
    error: any
}
```

#### $close

連接關閉時觸發，可以透過 isManuallyClosed 得知是否需要重連。

```ts
const eventData: {
    isManuallyClosed: boolean
}
```
