import { Event } from './event'

type Channels = {
    call: {}
    done: {}
    fail: {
        error: any
    }
    success: {}
}

export class Loader extends Event<Channels> {
    private name: string
    private items: Array<() => Promise<void>> = []
    private status = {
        isDone: false,
        isCalled: false,
        isLoading: false,
        isSuccess: false,
        doneCount: 0,
        failMessage: null
    }
    constructor(name?: string) {
        super()
        this.name = name || '-'
    }
    get size() {
        return this.items.length
    }
    get doneCount() {
        return this.status.doneCount
    }
    get done() {
        return this.status.isDone
    }
    get fail() {
        return this.status.failMessage
    }
    get called() {
        return this.status.isCalled
    }
    get loading() {
        return this.status.isLoading
    }
    get success() {
        return this.status.isSuccess
    }
    push(callback: () => Promise<void>) {
        this.items.push(callback)
    }
    start() {
        if (this.status.isCalled) {
            throw new Error(`Loader ${this.name} Called.`)
        }
        this.emit('call', {})
        this.status.isCalled = true
        this.status.isLoading = true
        return new Promise((resolve, reject) => {
            let promises = []
            for (let item of this.items) {
                promises.push(async() => {
                    await item()
                    this.status.doneCount +=1
                })
            }
            Promise
                .all(promises)
                .then(result => {
                    this.emit('success', {})
                    this.status.isSuccess = true
                    resolve(result)
                })
                .catch(error => {
                    this.emit('fail', { error })
                    this.status.failMessage = error
                    reject(error)
                })
                .finally(() => {
                    this.emit('done', {})
                    this.status.isDone = true
                    this.status.isLoading = false
                })
        })
    }
}
