import { Event } from './event'
import { DeepReadonly } from '../types/record'

type StepTypes = 'step' | 'wrong' | 'notify'
type StepLevel = 'info' | 'warning' | 'danger' | 'success'

type Step = {
    type: StepTypes
    meta?: any
    level: StepLevel
    message: string
    createdAt: number
    checkoutAt: string
}

type PushParams = {
    type: StepTypes
    meta?: any
    level: StepLevel
    message: string
    checkoutAt: string
}

type Channels = {
    action: Step
}

type Params = {
    name: string
    stepMaxSize?: number
    interceptorMessage?: (_data: any) => string
}

export class Interaction extends Event<Channels> {
    protected name: string
    protected steps: Step[] = []
    protected parent?: Interaction
    protected stepMaxSize = 100
    protected interceptorMessage: NonNullable<Params['interceptorMessage']>
    constructor({ name, interceptorMessage, stepMaxSize }: Params) {
        super()
        this.name = name
        this.interceptorMessage = interceptorMessage || ((data) => data)
        this.stepMaxSize = stepMaxSize || 100
    }

    get fullName(): string {
        return this.parent ? `${this.parent.fullName}/${this.name}` : this.name
    }

    private pushStep(params: PushParams) {
        if (this.parent) {
            this.parent.pushStep(params)
        } else {
            if (this.steps.length >= this.stepMaxSize) {
                this.steps.shift()
            }
            const step: Step = {
                ...params,
                message: this.interceptorMessage(params.message),
                createdAt: Date.now()
            }
            this.steps.push(step)
            this.emit('action', step as DeepReadonly<Step>)
        }
    }

    /**
     * 迭代每個階段訊息
     */

    each(cb: (_step: Step, _index: number) => void) {
        this.steps.forEach(cb)
    }

    /**
     * 增加一個階段訊息
     */

    step(message: string, meta?: any) {
        this.pushStep({
            meta,
            type: 'step',
            level: 'info',
            message: message,
            checkoutAt: this.fullName
        })
    }

    /**
     * 發出錯誤的訊息
     */

    wrong(message: any) {
        this.pushStep({
            meta: message,
            type: 'wrong',
            level: 'danger',
            message,
            checkoutAt: this.fullName
        })
    }

    /**
     * 切出一個分支有利於追蹤
     */

    checkout(name: string): Pick<Interaction, 'wrong' | 'notify' | 'checkout' | 'step'> {
        const branch = new Interaction({
            name,
            interceptorMessage: this.interceptorMessage
        })
        branch.parent = this
        return {
            step: branch.step.bind(branch),
            wrong: branch.wrong.bind(branch),
            notify: branch.notify.bind(branch),
            checkout: branch.checkout.bind(branch)
        }
    }

    /**
     * 發出通知的訊息
     */

    notify(type: 'info' | 'warning' | 'danger' | 'success', content: any) {
        this.pushStep({
            meta: content,
            type: 'notify',
            level: type,
            message: content as any,
            checkoutAt: this.fullName
        })
    }
}
