import { Event } from './event'

type Params = {
    delay?: number
    totalDuration?: number
    maxValueLength?: number
}

type Channels<T> = {
    close: {}
    trigger: {
        values: T[]
    }
}

class DebounceUnit extends Event<Channels<any>> {
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

export class Debounce<T> extends Event<Channels<T>> {
    private unit: DebounceUnit | null = null
    private params: Params
    constructor(params: Params) {
        super()
        this.params = params
    }

    input(value: T) {
        if (this.unit == null) {
            this.unit = new DebounceUnit(this.params)
            this.unit.on('trigger', ({ values }) => this.emit('trigger', { values }))
            this.unit.on('close', () => this.stop())
        }
        this.unit.input(value)
    }

    trigger() {
        if (this.unit) {
            this.unit.trigger()
        }
    }

    stop() {
        if (this.unit) {
            this.unit.close()
            this.unit = null
        }
    }
}
