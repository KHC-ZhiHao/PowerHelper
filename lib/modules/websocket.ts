import { Event } from './event'

type Pub = Record<string, any>

type FailTypes = 'unknown' | 'send' | 'message'

type Channels = {
    $open: any
    $error: {
        from: FailTypes
        error: any
    }
    $close: {
        isManuallyClosed: boolean
    }
}

type WebSocketParams<P extends Pub> = {
    url: string
    system?: typeof WebSocket
    protocol?: string[]
    onMessage: (event: MessageEvent) => Promise<any>
    sendHandler: <K extends keyof P>(channel: K, data: P[K]) => Promise<any>
}

export class WebSocketClient<P extends Pub, S> extends Event<S & Channels> {
    _websocket: WebSocket
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
    get status() {
        if (this.connected === false) {
            return 'wait'
        }
        if (this._websocket.readyState === 0) {
            return 'connecting'
        }
        if (this._websocket.readyState === 1) {
            return 'open'
        }
        if (this._websocket.readyState === 2) {
            return 'closeing'
        }
        if (this._websocket.readyState === 3) {
            return 'closed'
        }
    }
    send<K extends keyof P>(channel: K, data: P[K]) {
        this.params
            .sendHandler(channel, data)
            .then((record) => {
                if (this.connected) {
                    this._websocket.send(record)
                } else {
                    console.warn(`Socket not connected, from send ${channel}.`)
                }
            })
            .catch(error => {
                this.fail('send', error)
            })
    }
    connect() {
        return new Promise((resolve, reject) => {
            let opened = false
            let System = this.params.system ? this.params.system : WebSocket
            if (this.connected) {
                console.warn(`Websocket ${this.params.url} already connected.`)
            }
            this._websocket = new System(this.params.url, this.params.protocol)
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
                this._websocket = null
                this.emit('$close', data)
                this.isManuallyClosed = false
            }
        })
    }
    disconnect() {
        if (this.connected) {
            this.isManuallyClosed = true
            this._websocket.close()
        } else {
            console.warn('Socket not connected, from disconnect.')
        }
    }
}
