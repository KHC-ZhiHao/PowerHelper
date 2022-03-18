import { Event } from 'power-helper'

type Channels<S, D, R> = {
    done: {
        step: string
        data: D
        store: S
        result: R
    }
}

type FlowStack<S, D> = {
    name: string
    callback: (context: FlowContext<S, D>) => Promise<void>
}

type FlowContext<S, D> = {
    exit: () => void
    step: string
    data: Readonly<D>
    store: S
}

type FlowParams<S, D, R> = {
    init: () => Promise<S>
    fail?: (context: FlowContext<S, D> & { error: any }) => Promise<any>
    input?: (context: FlowContext<S, D>) => Promise<any>
    output: (context: FlowContext<S, D> & { isExit: boolean }) => Promise<R>
    beforeEach?: (context: FlowContext<S, D>) => Promise<any>
}

export class Flow<S, D, R> extends Event<Channels<S, D, R>> {
    private store: S = null
    private inited = false
    private params: FlowParams<S, D, R>
    private stacks: FlowStack<S, D>[] = []
    constructor(params: FlowParams<S, D, R>) {
        super()
        this.params = params
    }

    push(name: string, callback: FlowStack<S, D>['callback']) {
        let already = this.stacks.find(e => e.name === name)
        if (already) {
            throw new Error(`Flow name "${name}" already exists.`)
        }
        this.stacks.push({
            name,
            callback
        })
    }

    async invoke(data: D) {
        let isExit = false
        let context: FlowContext<S, D> = {
            data,
            step: 'system/init',
            store: this.store,
            exit: () => {
                isExit = true
            }
        }
        try {
            // init
            if (this.inited === false) {
                this.inited = true
                context.store = await this.params.init()
            }
            // input
            if (this.params.input) {
                context.step = 'system/input'
                await this.params.input(context)
            }
            // stack
            for (let stack of this.stacks) {
                context.step = `stack/${stack.name}`
                if (this.params.beforeEach) {
                    await this.params.beforeEach(context)
                }
                await stack.callback(context)
                if (isExit) {
                    break
                }
            }
            // output
            const result = await this.params.output({
                ...context,
                isExit
            })
            this.emit('done', {
                step: context.step,
                data: context.data,
                store: context.store,
                result
            })
            return result
        } catch (error) {
            // fail
            if (this.params.fail) {
                await this.params.fail({
                    ...context,
                    data,
                    error
                })
            }
            throw error
        }
    }
}
