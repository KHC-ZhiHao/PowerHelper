import { Event } from './event'

type PickContext = {
    key: string
}

type Pick<P, R> = (params: P, context: PickContext) => Promise<R>

class CacheItem<T> {
    readonly data: T
    index: number
    keepAlive: number
    createdAt: number = Date.now()
    constructor(data: T, index: number, keepAlive: number) {
        this.data = data
        this.index = index
        this.keepAlive = keepAlive
    }

    isExpired() {
        return (this.createdAt + this.keepAlive) < Date.now()
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
    private index = 0
    private maxSize: number
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
        /** 最多存取幾筆資料，超過則會刪除最舊的資料 */
        maxSize?: number
    }) {
        super()
        this.key = params.key
        this.pick = params.pick
        this.maxSize = params.maxSize || Infinity
        this.keepAlive = params.keepAlive == null ? Infinity : params.keepAlive
    }

    private refresh() {
        if (this.keepAlive !== Infinity) {
            this.removeExpired()
        }
        if (this.maxSize !== Infinity) {
            if (this.items.size > this.maxSize) {
                let diff = this.items.size - this.maxSize
                let items = [...this.items.entries()].sort((a, b) => a[1].index > b[1].index ? 1 : -1).slice(0, diff)
                for (let item of items) {
                    this.removeByKey(item[0])
                }
            }
        }
    }

    /** 獲取所有的 Cache 鍵值 */

    keys() {
        return Array.from(this.items.keys())
    }

    /** 獲取 Cache 的資料長度 */

    size() {
        return this.items.size
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

    /** 手動清除過期的 Cache。 */

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
        this.index += 1
        this.items.set(key, new CacheItem(data, this.index, this.keepAlive))
        this.refresh()
    }

    /** 獲取指定參數的值。 */

    get(params: P): Promise<R> {
        this.refresh()
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
                        this.event.emit(channel, item as any)
                        this.setByKey(key, item)
                    })
                    .catch(reject)
            }
        })
    }
}
