// 未定案
// 參考: https://blog.techbridge.cc/2017/12/08/rxjs/

import { Event } from './event'
import { Schedule } from './schedule'

type Channels<S> = {
    actionBefore: ActionContext<S>
    actionAfter: ActionContext<S>
}

type ActionContext<S> = {
    state: S
    newKey: string
    oldKey: string
}

type ReactiveParams<S> = {
    schedule?: number
    init: (data: Partial<S>) => Promise<S>
    action: (context: ActionContext<S>) => Promise<string>
    observable: (state: S) => Promise<string>
}

export class Reactive<S> extends Event<Channels<S>> {
    private state: S
    private oldKey: string = null
    private params: ReactiveParams<S>
    private started = false
    private schedule = new Schedule()
    constructor(params: ReactiveParams<S>) {
        super()
        this.params = params
    }
    close() {
        this.schedule.close()
    }
    async start(data: Partial<S>) {
        if (this.started === false) {
            this.started = true
            this.state = await this.params.init(data)
            const schedule = this.params.schedule == null ? this.params.schedule : 100
            await this.dispatch()
            this.schedule.add('reactive', schedule, async() => await this.dispatch())
        }
        return this
    }
    async dispatch() {
        let newKey = await this.params.observable(this.state)
        if (newKey !== this.oldKey) {
            await this.trigger(newKey)
        }
    }
    async trigger(newKey: string) {
        const context = {
            state: this.state,
            newKey,
            oldKey: this.oldKey
        }
        this.emit('actionBefore', context)
        await this.params.action(context)
        this.emit('actionAfter', context)
        this.oldKey = newKey
    }
}
