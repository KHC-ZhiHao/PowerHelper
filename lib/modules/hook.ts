import { Base } from '../module-base'

type ListenerContext = {
    /** 唯一並隨機的 Listener ID */
    id: string
    /** 關閉這個 Listener  */
    off: () => void
    /** 一組可供當下 Listener 儲存的空白物件 */
    state: Record<string, any>
}

type ListenerCallback<T> = (data: T, context: ListenerContext) => Promise<void>

class Listener<T> {
    /** 唯一並隨機的 Listener ID */
    readonly id = Date.now().toString() + Math.floor(Math.random() * 1000000)
    /** 一組可供當下 Listener 儲存的空白物件 */
    readonly state: Record<string, any> = {}
    /** 監聽的頻道 */
    readonly channel: string
    private callback: ListenerCallback<T>
    private manager: Hook<any>
    isAfter = false

    constructor(manager: Hook<any>, channel: string, callback: ListenerCallback<any>, isAfter: boolean) {
        this.manager = manager
        this.channel = channel
        this.callback = callback
    }

    /** 觸發這個監聽對象 */

    async invoke(data: T) {
        await this.callback(data, {
            id: this.id,
            off: () => this.off(),
            state: this.state
        })
    }

    /** 關閉這個 Listener */

    off() {
        this.manager.detach(this.channel, this.id)
    }
}

export class Hook<T extends Record<string, Record<string, any>>> extends Base {
    private listeners: Map<string, Listener<any>[]> = new Map()
    constructor() {
        super('Hook')
    }

    /** 發送資料至指定頻道 */

    async notify<K extends keyof T>(channel: K, data: T[K]) {
        let listeners = this.listeners.get(channel as string)
        if (listeners) {
            for (let listener of listeners.filter(e => e.isAfter === false)) {
                await listener.invoke(data)
            }
            for (let listener of listeners.filter(e => e.isAfter)) {
                await listener.invoke(data)
            }
        }
    }

    /** 取消指定 ID 掛勾 */

    detach<K extends keyof T>(channel: K, id: string) {
        let key = channel as string
        let listeners = this.listeners.get(key)
        if (listeners) {
            this.listeners.set(key, listeners.filter(e => e.id !== id))
        }
    }

    /** 掛勾指定頻道 */

    attach<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>) {
        let key = channel as string
        let listener: Listener<T[K]> = new Listener(this, key, callback, false)
        if (this.listeners.has(key) === false) {
            this.listeners.set(key, [])
        }
        (this.listeners.get(key) as any).push(listener)
        return listener
    }

    /** 掛勾指定頻道，並將執行順序安排到最後 */

    attachAfter<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>) {
        let listener = this.attach(channel, callback)
        listener.isAfter = true
        return listener
    }
}
