import { Event } from './event'

type Pub = Record<string, any>

type FailTypes = 'unknown' | 'send' | 'message'

type Events = {
    /** 成功連接伺服器時觸發。 */
    $open: any
    /** 連接失敗等狀態等觸發。 */
    $error: {
        from: FailTypes
        error: any
    }
    /** 連接關閉時觸發，可以透過 isManuallyClosed 得知是否需要重連。 */
    $close: {
        isManuallyClosed: boolean
    }
}

type WebSocketParams<P extends Pub> = {
    /** 連線網址 */
    url: () => string | Promise<string>
    /** 指定運行的 WebSocket 環境，假如你想應用在 NodeJs 上必須設定此參數 */
    system?: typeof WebSocket
    /** 指定運行的 WebSocket Protocol */
    protocol?: string[]
    /** 接收到資料要執行什麼事 */
    onMessage: (_event: MessageEvent) => Promise<any>
    /** 發送資料前進行資料轉換 */
    sendHandler: <K extends keyof P>(_channel: K, _data: P[K]) => Promise<any>
}

/**
 * 具有重新連線與頻道模式的 WebSocket 模塊，你可以透過 onMessage 監聽伺服器方的訊息，並透過 event system 發送給其他監聽對象。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/websocket.md
 */

export class WebSocketClient<P extends Pub, S> extends Event<S & Events> {
    _websocket?: WebSocket
    private params: WebSocketParams<P>
    private isManuallyClosed = false

    constructor(params: WebSocketParams<P>) {
        super()
        this.params = params
    }

    private fail(from: FailTypes, error: any) {
        this.emit('$error', {
            from,
            error
        } as any)
    }

    private get connected() {
        return !!this._websocket
    }

    private createWebsocket(url: string) {
        if (this.connected) {
            console.warn(`Websocket ${url} already connected.`)
        }
        let opened = false
        let System = this.params.system ? this.params.system : WebSocket
        return new Promise((resolve, reject) => {
            this._websocket = new System(url, this.params.protocol)
            this._websocket.onopen = () => {
                opened = true
                this.emit('$open', {})
                resolve(null)
            }
            this._websocket.onerror = (error) => {
                if (opened === false) {
                    reject(error)
                } else {
                    this.fail('unknown', error)
                }
            }
            this._websocket.onmessage = async(event) => {
                try {
                    await this.params.onMessage(event)
                } catch (error) {
                    this.fail('message', error)
                }
            }
            this._websocket.onclose = () => {
                let data: any = {
                    isManuallyClosed: this.isManuallyClosed
                }
                this._websocket = undefined
                this.emit('$close', data)
                this.isManuallyClosed = false
            }
        })
    }

    /* 現在的連線狀態 */
    getStatus() {
        if (this.connected === false) {
            return 'wait'
        }
        if (this._websocket?.readyState === 0) {
            return 'connecting'
        }
        if (this._websocket?.readyState === 1) {
            return 'open'
        }
        if (this._websocket?.readyState === 2) {
            return 'closeing'
        }
        if (this._websocket?.readyState === 3) {
            return 'closed'
        }
    }

    /* 發送資料至伺服器 */
    async send<K extends keyof P>(channel: K, data: P[K]) {
        try {
            let record = await this.params.sendHandler(channel, data)
            if (this.connected) {
                this._websocket?.send(record)
            } else {
                console.warn(`Socket not connected, from send ${channel as string}.`)
            }
        } catch (error) {
            this.fail('send', error)
        }
    }

    /* 連接至伺服器 */
    async connect() {
        let url = await this.params.url()
        let websocket = await this.createWebsocket(url)
        return websocket
    }

    /* 斷開伺服器連線 */
    disconnect() {
        if (this.connected) {
            this.isManuallyClosed = true
            this._websocket?.close()
        } else {
            console.warn('Socket not connected, from disconnect.')
        }
    }
}
