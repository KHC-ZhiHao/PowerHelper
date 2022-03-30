import { Cache } from './cache'

export class Loader<T extends (...params: any[]) => Promise<any>> {
    private callback: T
    private cache = new Cache({
        keepAlive: Infinity,
        key: () => 'loader',
        pick: (params: any[]) => new Promise((resolve, reject) => {
            this.status.params = params
            this.status.isCalled = true
            this.status.isLoading = true
            this.callback(...params)
                .then(result => {
                    this.status.result = result
                    resolve(result)
                })
                .catch(error => {
                    this.status.failMessage = error
                    reject(error)
                })
                .finally(() => {
                    this.status.isLoading = false
                })
        })
    })
    private status = {
        isDone: false,
        isCalled: false,
        isLoading: false,
        failMessage: null,
        result: null,
        params: null
    }
    constructor(callback: T) {
        this.callback = callback
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
    get result() {
        return this.status.result
    }
    get params() {
        return this.status.params
    }
    reset() {
        this.cache.clear()
        this.status = {
            isDone: false,
            isCalled: false,
            isLoading: false,
            failMessage: null,
            result: null,
            params: null
        }
    }
    fetch(...params: Parameters<T>): ReturnType<T> {
        return this.cache.get(params) as any
    }
}
