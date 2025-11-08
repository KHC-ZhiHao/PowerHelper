import { Event } from './event.js'

type Params = {
    /** 等待超時時間，單位:毫秒 */
    delay?: number
    /** 如果超過這個時間則無論如何都觸發 trigger，單位:毫秒 */
    totalDuration?: number
    /** 存取資料超過指定長度時觸發 */
    maxValueLength?: number
}

type Channels<T> = {
    input: {
        value: T
    }
    trigger: {
        values: T[]
    }
}

class DebounceUnit extends Event<Channels<any> & { close: Record<string, unknown> }> {
    isDone = false
    params: Params
    values: any[] = []
    duration: number
    totalDuration: number
    constructor(params: Params) {
        super()
        this.params = params
        this.duration = params.delay == null ? -1 : params.delay
        this.totalDuration = params.totalDuration == null ? -1 : params.totalDuration
        this.loop()
    }

    loop() {
        if (this.isDone) {
            return null
        }
        if (this.duration === 0) {
            return this.trigger()
        }
        if (this.totalDuration === 0) {
            return this.trigger()
        }
        if (this.params.maxValueLength != null && this.params.maxValueLength <= this.values.length) {
            return this.trigger()
        }
        this.duration -= 1
        this.totalDuration -= 1
        setTimeout(() => this.loop(), 1)
    }

    input(value: any) {
        this.values.push(value)
        this.duration = this.params.delay == null ? -1 : this.params.delay
    }

    trigger() {
        if (this.isDone === false) {
            this.close()
            this.emit('trigger', {
                values: this.values
            })
        }
    }

    close() {
        if (this.isDone === false) {
            this.isDone = true
            this.emit('close', {})
        }
    }
}

/**
 * 去抖動功能，當觸發事件後會搜集結果並延遲事件發生，避免頻繁發出請求
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/debounce.md
 */

export class Debounce<T> extends Event<Channels<T>> {
    private unit: DebounceUnit | null = null
    private params: Params
    constructor(params: Params) {
        super()
        this.params = params
    }

    /** 加入一組值，並且 delay 重新計算 */
    input(value: T) {
        if (this.unit == null) {
            this.unit = new DebounceUnit(this.params)
            this.unit.on('trigger', ({ values }) => this.emit('trigger', { values }))
            this.unit.on('close', () => this.close())
        }
        this.unit.input(value)
        this.emit('input', { value })
    }

    /** 不須等待直接觸發事件 */
    trigger() {
        if (this.unit) {
            this.unit.trigger()
        } else {
            this.emit('trigger', {
                values: []
            })
        }
    }

    /** 終止現在正在運行的 input */
    close() {
        if (this.unit) {
            this.unit.close()
            this.unit = null
        }
    }
}
