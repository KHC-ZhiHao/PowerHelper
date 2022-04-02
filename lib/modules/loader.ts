import { Event } from './event'

type FailError = {
    isPowerHelperLoader: true
    name: string
    error: any
}

type Channels = {
    call: {}
    done: {}
    fail: {
        error: FailError
    }
    complete: {
        name: string
        result: any
    }
}

type LoaderItem<T> = {
    name: string
    handler: (data: T) => Promise<any>
}

export class Loader<T> extends Event<Channels> {
    private items: LoaderItem<T>[] = []
    private status = {
        isDone: false,
        isCalled: false,
        isLoading: false,
        complete: 0,
        fail: null
    }
    get size() {
        return this.items.length
    }
    get complete() {
        return this.status.complete
    }
    get done() {
        return this.status.isDone
    }
    get fail() {
        return this.status.fail as null | FailError
    }
    get called() {
        return this.status.isCalled
    }
    get loading() {
        return this.status.isLoading
    }

    /** 加入一個非同步事件 */

    push(name: string, handler: (data: T) => Promise<any>) {
        let has = this.items.find(e => e.name === name)
        if (has) {
            this.$devError('push', `Name ${name} already exists.`)
        }
        this.items.push({
            name,
            handler
        })
    }

    /** 執行所有已註冊的事件 */

    start(data: T): Promise<Array<{ name: string, result: any }>> {
        if (this.status.isCalled) {
            this.$devError('start', `Loader Already Called.`)
        }
        this.status.isCalled = true
        this.status.isLoading = true
        this.emit('call', {})
        return new Promise((resolve, reject) => {
            let promises = this.items.map(({ name, handler }) => {
                return async() => {
                    try {
                        let result = await handler(data)
                        this.status.complete += 1
                        this.emit('complete', {
                            name,
                            result
                        })
                        return {
                            name,
                            result
                        }
                    } catch (error) {
                        throw {
                            isPowerHelperLoader: true,
                            name,
                            error
                        }
                    }
                }
            })
            Promise
                .all(promises.map(e => e()))
                .then(result => {
                    this.status.isDone = true
                    this.status.isLoading = false
                    this.emit('done', {})
                    resolve(result)
                })
                .catch(error => {
                    this.status.isDone = true
                    this.status.isLoading = false
                    this.status.fail = error
                    this.emit('fail', { error })
                    reject(error)
                })
        })
    }
}
