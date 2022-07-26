import { Event } from './event'

export class Ticker extends Event<{
    next: {
        /** 執行次數 */
        delta: number
        /** 上次執行時間與這次的差異毫秒 */
        timeGap: number
    }
}> {
    private int: ReturnType<typeof setInterval>
    private isStop = false
    private delta = 0
    private previousTime = Date.now()
    constructor(ms: number, options?: {
        /** 是否預設為自動執行 */
        autoPlay?: boolean
    }) {
        super()
        this.int = setInterval(() => this.run(), ms)
        if (options) {
            if (options.autoPlay === false) {
                this.stop()
            }
        }
    }

    private run() {
        if (this.isStop === false) {
            let now = Date.now()
            this.delta += 1
            this.emit('next', {
                delta: this.delta,
                timeGap: now - this.previousTime
            })
            this.previousTime = now
        }
    }

    /** 暫停 event 被呼叫 */

    stop() {
        this.isStop = true
    }

    /** 假如是暫停狀態可以透過 play 繼續定時執行 event */

    play() {
        this.isStop = false
        this.previousTime = Date.now()
    }

    /** 關閉 Interval 的執行 */

    close() {
        clearInterval(this.int)
    }
}
