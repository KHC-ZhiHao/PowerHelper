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
    oldKey: string | null
}

type NextTickCallback<S> = (state: S) => void

type ReactiveParams<S> = {
    schedule?: number
    action: (context: ActionContext<S> & { close: () => void }) => Promise<any>
    observable: (state: S) => Promise<string>
}

export class Reactive<S extends Record<string, any>> extends Event<Channels<S>> {
    private state!: S
    private oldKey: string | null = null
    private params: ReactiveParams<S>
    private schedule = new Schedule()
    private nextTicks: NextTickCallback<S>[] = []
    constructor(params: ReactiveParams<S>) {
        super()
        this.params = params
    }
    close() {
        this.schedule.close()
    }
    nextTick(cb: NextTickCallback<S>) {
        this.nextTicks.push(cb)
    }
    async from(data: S) {
        this.oldKey = null
        this.state = data
        const schedule = this.params.schedule != null ? this.params.schedule : 100
        await this.dispatch()
        if (this.schedule.has('reactive') === false) {
            this.schedule.add('reactive', schedule, async() => await this.dispatch())
        }
        return this
    }
    async dispatch() {
        let newKey = await this.params.observable(this.state)
        if (newKey !== this.oldKey) {
            await this.trigger(newKey)
        }
        if (this.nextTicks.length >= 1) {
            for (let tick of this.nextTicks) {
                tick(this.state)
            }
            this.nextTicks = []
        }
    }
    async trigger(newKey: string) {
        const context = {
            state: this.state,
            newKey,
            oldKey: this.oldKey
        }
        this.emit('actionBefore', context)
        await this.params.action({
            ...context,
            close: () => this.close()
        })
        this.emit('actionAfter', context)
        this.oldKey = newKey
    }
}
