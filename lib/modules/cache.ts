import { Event } from './event'

type PickContext = {
    key: string
}

type Pick<P, R> = (params: P, context: PickContext) => Promise<R>

class CacheItem<T> {
    readonly data: T
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

type Channels<T> = {
    remove: {
        data: T
    }
}

export class Cache<P, R> extends Event<Channels<R>> {
    private event = new Event()
    private key: (params: P) => string
    private pick: Pick<P, R>
    private keepAlive: number
    private items: Map<string, CacheItem<R>> = new Map()
    constructor(params: {
        /** 將參數轉換成唯一鍵 */
        key: (params: P) => string
        /** 如果鍵值不存在則如何獲取資料 */
        pick: Pick<P, R>
        /** 每筆資料的存活時間，超過則重取，單位:毫秒 */
        keepAlive?: number
    }) {
        super()
        this.key = params.key
        this.pick = params.pick
        this.keepAlive = params.keepAlive == null ? 60 * 1000 * 5 : params.keepAlive
    }

    /** 獲取所有的 Cache 鍵值 */

    keys() {
        return Array.from(this.items.keys())
    }

    /** 清空所有 Cache。 */

    clear() {
        let keys = this.keys()
        for (let key of keys) {
            this.removeByKey(key)
        }
    }

    /** 刪除指定參數的 Cache。 */

    remove(params: P) {
        let key = this.key(params)
        this.removeByKey(key)
    }

    /** 清除過期的 Cache。 */

    removeExpired() {
        for (let [key, data] of this.items) {
            if (data.isExpired()) {
                this.removeByKey(key)
            }
        }
    }

    private removeByKey(key: string) {
        let data = this.items.get(key)
        if (data) {
            this.emit('remove', {
                data: data.data
            })
            this.items.delete(key)
        }
    }

    /** 直接設定指定參數的值。 */

    set(params: P, data: R) {
        let key = this.key(params)
        this.setByKey(key, data)
    }

    private setByKey(key: string, data: R) {
        this.removeByKey(key)
        this.items.set(key, new CacheItem(data, this.keepAlive))
    }

    /** 獲取指定參數的值。 */

    get(params: P): Promise<R> {
        return new Promise((resolve, reject) => {
            let key = this.key(params)
            let item = this.items.get(key)
            if (item && item.isExpired() === false) {
                return resolve(item.data)
            }
            let channel = `${key}-onload`
            this.event.on(channel, (data, context) => {
                context.off()
                resolve(data as any)
            })
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
