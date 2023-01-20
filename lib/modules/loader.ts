import { Event } from './event'
import { devError } from '../base'

type FailError = {
    isPowerHelperLoader: true
    name: string
    error: any
    loaderName: string
}

type Channels = {
    call: Record<string, unknown>
    done: Record<string, unknown>
    fail: {
        error: FailError
    }
    complete: {
        name: string
        result: any
        loaderName: string
    }
}

type LoaderItem<T> = {
    name: string
    handler: (_data: T) => Promise<any>
}

export class Loader<T> extends Event<Channels> {
    private name: string
    private items: LoaderItem<T>[] = []
    private status = {
        isDone: false,
        isCalled: false,
        isLoading: false,
        complete: 0,
        fail: null
    }

    constructor(name = 'no_name') {
        super()
        this.name = name
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

    /** 清空所有非同步事件 */

    clear() {
        this.items = []
    }

    /** 加入一個非同步事件 */

    push(name: string, handler: (_data: T) => Promise<any>) {
        let has = this.items.find(e => e.name === name)
        if (has) {
            devError('push', `Loader ${name} push name ${name} already exists.`)
        }
        this.items.push({
            name,
            handler
        })
    }

    /** 重置 Loader 狀態，只有在 done 為 true 才能執行 */

    reset() {
        if (this.status.isDone === false) {
            throw new Error(`Loader ${this.name} call "reset" must called start.`)
        }
        Object.assign(this.status, {
            isDone: false,
            isCalled: false,
            isLoading: false,
            complete: 0,
            fail: null
        })
        return this
    }

    /** 執行所有已註冊的事件 */

    start(data: T): Promise<Array<{ name: string, result: any }>> {
        if (this.status.isCalled) {
            devError('start', `Loader ${this.name} Already Called.`)
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
                            result,
                            loaderName: this.name,
                        })
                        return {
                            name,
                            result
                        }
                    } catch (error) {
                        throw {
                            isPowerHelperLoader: true,
                            loaderName: this.name,
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
                    this.emit('fail', {
                        error
                    })
                    reject(error)
                })
        })
    }
}
