type Context<T> = {
    key: string
    value: T
}

type Params<T> = {
    ttl: number
    maxSize?: number
    intercept?: {
        set?: (_context: Context<T>) => Context<T>
    }
}

/**
 * 指定鍵值並同步的存取，非常近似 Map 物件，但是有 TTL(Time To Live)。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/cache-lite.md
 */

export class CacheLite<T> {
    private params: Params<T>
    private lastUpdate = Date.now()
    private keyMap = new Map<string, {
        data: T
        time: number
    }>()

    constructor(params: Params<T>) {
        this.params = params
    }

    private gc() {
        let now = Date.now()
        if (now > this.lastUpdate + this.params.ttl) {
            for (let [key, value] of this.keyMap.entries()) {
                if ((value.time + this.params.ttl) < now) {
                    this.keyMap.delete(key)
                }
            }
            this.lastUpdate = now
        }
    }

    /**
     * 獲取目前 Cache 的量
     */

    get size() {
        return this.keyMap.size
    }

    /**
     * 清除 cache
     */

    clear() {
        this.keyMap.clear()
    }

    /**
     * 獲取目標
     */

    get(key: string): undefined | T {
        this.gc()
        return this.keyMap.get(key)?.data
    }

    /**
     * 設定目標
     */

    set(key: string, value: T): T {
        const context = { key, value }
        const result = this.params.intercept?.set ? this.params.intercept?.set(context) : context
        this.gc()
        this.keyMap.set(result.key, {
            data: result.value,
            time: Date.now()
        })
        if (this.params.maxSize && this.keyMap.size > this.params.maxSize) {
            let firstKey = Array.from(this.keyMap.keys())[0]
            if (firstKey != null) {
                this.keyMap.delete(firstKey)
            }
        }
        return result.value
    }

    /**
     * 有無目標
     */

    has(key: string) {
        this.gc()
        return this.keyMap.has(key)
    }

    /**
     * 刪除目標
     */

    remove(key: string) {
        this.gc()
        if (this.keyMap.has(key)) {
            this.keyMap.delete(key)
        }
    }

    /**
     * 獲取鍵組
     */

    keys() {
        this.gc()
        return [...this.keyMap.keys()]
    }
    /**
     * 獲取值組
     */

    values() {
        this.gc()
        return [...this.keyMap.values()].map(e => e.data)
    }
}
