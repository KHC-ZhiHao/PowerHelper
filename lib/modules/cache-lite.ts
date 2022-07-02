import { Base } from '../module-base'

export class CacheLite<T extends (key: string) => any> extends Base {
    private expTime: number
    private handler: T
    private lastUpdate = Date.now()
    private keyMap = new Map<string, {
        data: ReturnType<T>
        time: number
    }>()

    /**
     * @param expTime 過期時間
     */

    constructor(expTime: number, cb: T) {
        super()
        this.expTime = expTime
        this.handler = cb
    }

    private gc() {
        let now = Date.now()
        if (now > this.lastUpdate + this.expTime) {
            for (let [key, value] of this.keyMap.entries()) {
                if ((value.time + this.expTime) < now) {
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

    get(key: string = ''): ReturnType<T> {
        this.gc()
        if (this.keyMap.has(key)) {
            return this.keyMap.get(key)!.data
        }
        let data = this.handler(key)
        this.keyMap.set(key, {
            data,
            time: Date.now()
        })
        return data
    }
}
