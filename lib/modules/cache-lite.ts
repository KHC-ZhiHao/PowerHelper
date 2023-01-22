type Params<T> = {
    expTime: number
    handler: T
    maxSize?: number
}

export class CacheLite<T extends (key: string) => any> {
    private params: Params<T>
    private lastUpdate = Date.now()
    private keyMap = new Map<string, {
        data: ReturnType<T>
        time: number
    }>()

    constructor(params: Params<T>) {
        this.params = params
    }

    private gc() {
        let now = Date.now()
        if (now > this.lastUpdate + this.params.expTime) {
            for (let [key, value] of this.keyMap.entries()) {
                if ((value.time + this.params.expTime) < now) {
                    this.keyMap.delete(key)
                }
            }
            this.lastUpdate = now
        }
    }

    /**
     * 獲取目前 Cache 的量
     */

    getSize() {
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

    get(key = ''): ReturnType<T> {
        this.gc()
        if (this.keyMap.has(key)) {
            return this.keyMap.get(key)!.data
        }
        let data = this.params.handler(key)
        this.keyMap.set(key, {
            data,
            time: Date.now()
        })
        if (this.params.maxSize && this.keyMap.size > this.params.maxSize) {
            let firstKey = Array.from(this.keyMap.keys())[0]
            if (firstKey != null) {
                this.keyMap.delete(firstKey)
            }
        }
        return data
    }

    /**
     * 清除指定 cache key
     */

    remove(key: string) {
        if (this.keyMap.has(key)) {
            this.keyMap.delete(key)
        }
    }
}
