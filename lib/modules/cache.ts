import { Base } from '../module-base'
import { Event } from './event'

type Pick<P, R> = (params: P, context: {
    key: string
}) => Promise<R>

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

export class Cache<P, R> extends Base {
    private event = new Event()
    private key: (params: P) => string
    private pick: Pick<P, R>
    private keepAlive: number
    private items: Map<string, CacheItem<R>> = new Map()
    constructor(params: {
        key: (params: P) => string
        pick: Pick<P, R>
        keepAlive?: number
    }) {
        super('Cache')
        this.key = params.key
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

    remove(params: P) {
        let key = this.key(params)
        this.removeByKey(key)
    }

    removeByKey(key: string) {
        if (this.items.has(key)) {
            this.items.delete(key)
        }
    }

    set(params: P, data: R) {
        let key = this.key(params)
        this.setByKey(key, data)
    }

    setByKey(key: string, data: R) {
        this.items.set(key, new CacheItem(data, this.keepAlive))
    }

    get(params: P): Promise<R> {
        return new Promise((resolve, reject) => {
            let key = this.key(params)
            let item = this.items.get(key)
            if (item && item.isExpired() === false) {
                return resolve(item.data)
            }
            let channel = `${key}-onload`
            this.event.once(channel, ({ data }) => resolve(data as any))
            if (this.event.getChannelListenerSize(channel) === 1) {
                this.pick(params, { key })
                    .then(item => {
                        this.event.emit(channel, item)
                        this.setByKey(key, item)
                    })
                    .catch(reject)
            }
        })
    }
}
