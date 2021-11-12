import { Base } from '../module-base'
import { Event } from './event'

class CacheItem<T> {
    data: T
    keepAlive: number
    createdAt: number = Date.now()
    constructor(data: T, keepAlive: number) {
        this.data = data
        this.keepAlive = keepAlive
    }

    isExpired() {
        return this.createdAt + this.keepAlive < Date.now()
    }
}

export class Cache<T> extends Base {
    private event = new Event()
    private pick: (key: string) => Promise<T>
    private keepAlive: number
    private items: Map<string, CacheItem<T>> = new Map()
    constructor(params: {
        pick: (key: string) => Promise<T>
        keepAlive?: number
    }) {
        super('Cache')
        this.pick = params.pick
        this.keepAlive = params.keepAlive == null ? 60 * 1000 * 5 : params.keepAlive
    }

    /** 獲取所有的 Cache 鍵值 */

    keys() {
        return Array.from(this.items.keys())
    }

    clear() {
        this.items.clear()
    }

    remove(key: string) {
        if (this.items.has(key)) {
            this.items.delete(key)
        }
    }

    set(key: string, data: T) {
        this.items.set(key, new CacheItem(data, this.keepAlive))
    }

    get(key: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let item = this.items.get(key)
            if (item && item.isExpired() === false) {
                return resolve(item.data)
            }
            let channel = `${key}-onload`
            this.event.once(channel, ({ data }) => resolve(data as any))
            if (this.event.getChannelListenerSize(channel) === 1) {
                this.pick(key)
                    .then(item => {
                        this.event.emit(channel, item)
                        this.set(key, item)
                    }).catch(reject)
            }
        })
    }
}
