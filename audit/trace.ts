import { Event } from './event'

type Log = {
    name: string
    type: string
    meta: any
    branch?: string
    branchId?: string
    createdAt: number
}

type Channels = {
    step: Log
}

type TraceOptions = {
    logLimit?: number
}

type Types = {
    [key: string]: Record<string, any>
}

class Branch<T extends Types> {
    private id = (Date.now().toString()) + (Math.floor(Math.random() * 10000).toString())
    private name: string
    private trace: Trace<T>
    private parent?: Branch<T>
    constructor(trace: Trace<T>, name: string, parent?: Branch<T>) {
        this.name = name
        this.trace = trace
        this.parent = parent
    }
    step<K extends keyof T>(type: K, meta: T[K]) {
        this.trace.step(type, meta, {
            id: this.id,
            name: this.name,
            parentId: this.parent?.id,
            parentName: this.parent?.name
        })
    }
    checkout(name: string) {
        return new Branch(this.trace, name, this)
    }
}

export class Trace<T extends Types> extends Event<Channels> {
    private logs: Log[] = []
    private name: string
    private options: TraceOptions = {
        logLimit: 1000
    }
    constructor(name: string, options: TraceOptions = {}) {
        super()
        this.name = name
        Object.assign(this.options, options)
    }
    export() {
        return this.logs
    }
    step<K extends keyof T>(type: K, meta: T[K], _branch?: {
        id: string
        name: string
        parentId: string
        parentName: string
    }) {
        if (this.logs.length > this.options.logLimit) {
            this.logs.shift()
        }
        let log: Log = Object.freeze({
            name: this.name,
            meta,
            type: type as string,
            branch: _branch?.id,
            branchId: _branch?.name,
            parentId: _branch?.parent,
            createdAt: Date.now()
        })
        this.logs.push(log)
        this.emit('step', log)
    }
    checkout(name: string) {
        return new Branch<T>(this, name)
    }
}
