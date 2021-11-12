import { Base } from '../module-base'

type ListenerContext<T> = {
    id: string
    off: () => void
    data: T
    state: Record<string, any>
}

type ListenerCallback<T> = (context: ListenerContext<T>) => void

class Listener<T> {
    readonly id = Date.now().toString() + Math.floor(Math.random() * 1000000)
    readonly state: Record<string, any> = {}
    readonly channel: string
    private callback: ListenerCallback<T>
    private manager: Event<any>

    constructor(manager: Event<any>, channel: string, callback: ListenerCallback<any>) {
        this.manager = manager
        this.channel = channel
        this.callback = callback
    }

    invoke(data: T) {
        this.callback({
            id: this.id,
            off: () => this.off(),
            data,
            state: this.state
        })
    }

    off() {
        this.manager.off(this.channel, this.id)
    }
}

export class Event<T extends Record<string, Record<string, any>>> extends Base {
    private listeners: Map<string, Listener<any>[]> = new Map()
    constructor() {
        super('Event')
    }

    getChannelListenerSize<K extends keyof T>(channel: K) {
        let listeners = this.listeners.get(channel as string)
        if (listeners) {
            return listeners.length
        } else {
            return 0
        }
    }

    emit<K extends keyof T>(channel: K, data: T[K]) {
        let listeners = this.listeners.get(channel as string)
        if (listeners) {
            for (let listener of listeners) {
                listener.invoke(data)
            }
        }
    }

    off<K extends keyof T>(channel: K, id: string) {
        let key = channel as string
        let listeners = this.listeners.get(key)
        if (listeners) {
            this.listeners.set(key, listeners.filter(e => e.id !== id))
        }
    }

    on<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>) {
        let key = channel as string
        let listener: Listener<T[K]> = new Listener(this, key, callback)
        if (this.listeners.has(key) === false) {
            this.listeners.set(key, [])
        }
        (this.listeners.get(key) as any).push(listener)
        return listener
    }

    once<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>) {
        let key = channel as string
        let listener = this.on(key, (context) => {
            callback(context as any)
            context.off()
        })
        return listener
    }
}
