import { Event } from 'power-helper'
import { DeepReadonly } from 'power-helper/types/record'

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

type Options = {
    name: string
    parent?: Interaction
    interceptorMessage: (_data: any) => string
}

export class Interaction extends Event<Channels> {
    name: string
    steps: Step[] = []
    parent?: Interaction
    interceptorMessage: Options['interceptorMessage']
    constructor({ name, parent, interceptorMessage }: Options) {
        super()
        this.name = parent ? `${parent.name}/${name}` : name
        this.parent = parent
        this.interceptorMessage = interceptorMessage
    }

    private pushStep(params: PushParams) {
        if (this.parent) {
            this.parent.pushStep(params)
        } else {
            if (this.steps.length > 100) {
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

    each(cb: (_step: Step) => void) {
        return this.steps.forEach(cb)
    }

    step(message: string, meta?: any) {
        this.pushStep({
            meta,
            type: 'step',
            level: 'info',
            message: message,
            checkoutAt: this.name
        })
    }

    wrong(message: any) {
        this.pushStep({
            meta: message,
            type: 'wrong',
            level: 'danger',
            message,
            checkoutAt: this.name
        })
    }

    checkout(name: string): Pick<Interaction, 'wrong' | 'notify' | 'checkout' | 'step'> {
        const branch = new Interaction({
            name,
            parent: this,
            interceptorMessage: this.interceptorMessage
        })
        return {
            wrong: branch.wrong.bind(branch),
            notify: branch.notify.bind(branch),
            checkout: branch.checkout.bind(branch),
            step: branch.step.bind(branch)
        }
    }

    notify<T>(type: 'info' | 'warning' | 'danger' | 'success', content: T) {
        this.pushStep({
            meta: content,
            type: 'notify',
            level: type,
            message: content as any,
            checkoutAt: this.name
        })
    }
}
