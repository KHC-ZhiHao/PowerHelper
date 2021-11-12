import { Event } from './event'

export class Ticker extends Event<{
    next: {
        delta: number
    }
}> {
    private int: ReturnType<typeof setInterval>
    private isStop = false
    private delta = 0
    constructor(ms: number, options?: {
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
            this.delta += 1
            this.emit('next', {
                delta: this.delta
            })
        }
    }

    stop() {
        this.isStop = true
    }

    play() {
        this.isStop = false
    }

    close() {
        clearInterval(this.int)
    }
}
