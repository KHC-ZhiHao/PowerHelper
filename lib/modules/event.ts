type ListenerContext = {
    /**
     * @zh 唯一並隨機的 Listener ID
     * @en Unique and random Listener ID
     */
    id: string
    /**
     * @zh 關閉這個 Listener
     * @en Close this Listener
     */
    off: () => void
    /**
     * @zh 一組可供當下 Listener 儲存的空白物件
     * @en A set of blank objects that can be stored by the current Listener
     */
    state: Record<string, any>
}

type ListenerCallback<T> = (_data: T, _context: ListenerContext) => void

class Listener<T> {
    /**
     * @zh 唯一並隨機的 Listener ID
     * @en Unique and random Listener ID
     */

    id = Date.now().toString() + Math.floor(Math.random() * 1000000)

    /**
     * @zh 一組可供當下 Listener 儲存的空白物件
     * @en A set of blank objects that can be stored by the current Listener
     */

    state: Record<string, any> = {}

    /**
     * @zh 監聽的事件
     * @en Listened event
     */

    event: string
    callback: ListenerCallback<T>
    manager: Event<any>

    constructor(manager: Event<any>, event: string, callback: ListenerCallback<any>) {
        this.manager = manager
        this.event = event
        this.callback = callback
    }

    /**
     * @zh 觸發這個監聽對象
     * @en Trigger this Listener
     */

    invoke(data: T) {
        this.callback(data, {
            id: this.id,
            off: () => this.off(),
            state: this.state
        })
    }

    /**
     * @zh 關閉這個 Listener
     * @en Close this Listener
     */

    off() {
        this.manager.off(this.event, this.id)
    }
}

export class Event<T extends Record<string, Record<string, any>>> {
    listeners: Map<string, Listener<any>[]> = new Map()

    /**
     * @zh 獲取指定事件的監聽數量
     * @en Get the number of listeners for the specified event
     */

    getEventListenerSize<K extends keyof T>(event: K) {
        let listeners = this.listeners.get(event as string)
        if (listeners) {
            return listeners.length
        } else {
            return 0
        }
    }

    /**
     * @zh 發送資料至指定事件
     * @en Send data to the specified event
     */

    emit<K extends keyof T>(event: K, data: T[K]) {
        let listeners = this.listeners.get(event as string)
        if (listeners) {
            for (let listener of listeners) {
                listener.invoke(data)
            }
        }
        let allListeners = this.listeners.get('*')
        if (allListeners) {
            for (let listener of allListeners) {
                listener.invoke({
                    data,
                    event
                })
            }
        }
    }

    /**
     * @zh 停止指定事件與 ID 的 Listener
     * @en Stop the Listener of the specified event and ID
     */

    off<K extends keyof T>(event: K, id: string) {
        let key = event as string
        let listeners = this.listeners.get(key)
        if (listeners) {
            this.listeners.set(key, listeners.filter(e => e.id !== id))
        }
    }

    /**
     * @zh 監聽指定事件
     * @en Listen to the specified event
     */

    on<K extends keyof T>(event: K | '*', callback: ListenerCallback<T[K]>) {
        let key = event as string
        let listener: Listener<T[K]> = new Listener(this, key, callback)
        if (this.listeners.has(key) === false) {
            this.listeners.set(key, [])
        }
        (this.listeners.get(key) as any).push(listener)
        return listener
    }
}
