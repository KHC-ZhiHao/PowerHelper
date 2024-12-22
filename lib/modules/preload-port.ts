import { flow } from '../utils/flow'
import { CacheLite } from './cache-lite'
/**
 * 可以預先載入資料並透過 id 傳遞給需要的對象。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/preload-port.md
 */

export class PreloadPort<I, O> {
    _cache: CacheLite<Promise<O>>
    _handler: (data: I) => Promise<O>
    constructor(params: {
        ttl?: number
        handler: (data: I) => Promise<O>
    }) {
        this._handler = params.handler
        this._cache = new CacheLite<Promise<O>>({
            ttl: params.ttl || Infinity
        })
    }

    create(data: I) {
        const id = flow.createUuid()
        this._cache.set(id, this._handler(data))
        return id
    }

    remove(id: string) {
        this._cache.remove(id)
    }

    clear() {
        this._cache.clear()
    }

    async get(id: string | null | undefined, data: I) {
        if (id) {
            let now = this._cache.get(id)
            if (now != null) {
                const result = await now
                this._cache.remove(id)
                return result
            }
        }
        const result = await this._handler(data)
        return result
    }
}
