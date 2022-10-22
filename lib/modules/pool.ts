import { Cache } from './cache'
import { QueryCollection } from './query-collection'

type PoolParams<P, D> = {
    find: (_data: D, _params: P) => boolean
    fetch: (_params: P[]) => Promise<D[]>
    cache?: Omit<ConstructorParameters<typeof Cache<P, D>>[0], 'key' | 'pick'>
    collection?: Omit<ConstructorParameters<typeof QueryCollection<P, D>>[0], 'query'>
}

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
            keepAlive: cache?.keepAlive || 1000 * 60 * 5,
            maxSize: cache?.maxSize || 100,
            key: params => JSON.stringify(params),
            pick: async(params) => {
                let items = await this.dataCollection.push(params)
                return items.find(item => find(item, params))!
            }
        })
    }

    async pick(params: P) {
        const result = this.dataCache.get(params)
        return result
    }

    async list(paramsItems: P[]) {
        const result = await Promise.all(paramsItems.map(params => this.dataCache.get(params)))
        return result
    }

    /** 清除指定 cache */

    remove(params: P) {
        this.dataCache.remove(params)
    }

    /** 清空 cache */

    clear() {
        this.dataCache.clear()
    }
}
