import { Cache } from './cache.js'
import { QueryCollection } from './query-collection.js'

type PoolParams<P, D> = {
    find: (_data: D, _params: P, _index: number) => boolean
    fetch: (_params: P[]) => Promise<D[]>
    cache?: {
        ttl?: number
        maxSize?: number
    }
    collection?: {
        waitTime?: number
    }
}

/**
 * 輕鬆發出請求與快取請求資料的資料池。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/pool.md
 */

export class Pool<P, D> {
    private dataCache: Cache<P, D>
    private dataCollection: QueryCollection<P, D>
    constructor({ find, fetch, cache, collection }: PoolParams<P, D>) {
        this.dataCollection = new QueryCollection<P, D>({
            waitTime: collection?.waitTime || 100,
            query: async(items) => {
                let result = await fetch(items)
                return result
            }
        })
        this.dataCache = new Cache<P, D>({
            ttl: cache?.ttl || 1000 * 60 * 5,
            maxSize: cache?.maxSize || 100,
            key: params => JSON.stringify(params),
            pick: async(params) => {
                let items = await this.dataCollection.push(params)
                return items.find((item, index) => find(item, params, index))!
            }
        })
    }

    /** 獲取資料 */

    async pick(params: P) {
        const result = this.dataCache.get(params)
        return result
    }

    /** 批次獲取資料 */

    async list(paramsItems: P[]) {
        const result = await Promise.all(paramsItems.map(params => this.dataCache.get(params)))
        return result
    }

    /** 清除指定 cache */

    remove(params: P) {
        this.dataCache.remove(params)
    }

    /** 寫入資料 */

    set(params: P, data: D) {
        this.dataCache.set(params, data)
    }

    /** 清空 cache */

    clear() {
        this.dataCache.clear()
    }
}
