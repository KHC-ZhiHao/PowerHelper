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
    /** 每次輪詢時間(毫秒)，預設 100 ms */
    schedule?: number
    /** 透過長輪詢回傳指定的 key */
    action: (context: ActionContext<S> & { close: () => void }) => Promise<any>
    /** 如果 observable 回傳的 key 有改動則觸發 */
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
    /** 關閉輪詢 */
    close() {
        this.schedule.close()
    }
    /** 在下一次輪詢時觸發 */
    nextTick(cb: NextTickCallback<S>) {
        this.nextTicks.push(cb)
    }
    /** 指定監聽對象 */
    async from(data: S) {
        this.oldKey = null
        this.state = data
        const schedule = this.params.schedule != null ? this.params.schedule : 100
        await this.dispatch()
        if (this.schedule.has('reactive') === false) {
            this.schedule.add('reactive', schedule, async() => {
                await this.dispatch()
            })
        }
        return this
    }
    /** 觸發驗證是否改變了 key 值，如果改變則執行 action */
    private async dispatch() {
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
    /** 執行 action */
    private async trigger(newKey: string) {
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
