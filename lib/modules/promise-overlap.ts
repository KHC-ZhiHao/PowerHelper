type Pick = 'first' | 'last'

type Options = {
    delay?: number
}

type Process = {
    data: any
    closed: boolean
    isError: boolean
    resolve: any
    reject: any
}

export class PromiseOverlap<T> {
    private pick: Pick
    private options: Options
    private processes: Process[] = []

    constructor(pick: Pick, options: Options = {}) {
        this.pick = pick
        this.options = options
    }

    run(cb: () => Promise<T>): Promise<T> {
        let obj: Process = {
            data: null,
            closed: false,
            reject: null,
            resolve: null,
            isError: false
        }
        let finallyHandler = (data: any, isError: boolean) => {
            obj.data = data
            obj.closed = true
            obj.isError = isError
            let isAllClose = this.processes.filter(e => !e.closed).length === 0
            if (isAllClose) {
                let result
                if (this.pick === 'first') {
                    result = this.processes[0]
                } else {
                    result = this.processes[this.processes.length - 1]
                }
                for (let process of this.processes) {
                    if (result.isError) {
                        process.reject(result.data)
                    } else {
                        process.resolve(result.data)
                    }
                }
                this.processes = []
            }
        }
        this.processes.push(obj)
        return new Promise((resolve, reject) => {
            obj.reject = reject
            obj.resolve = resolve
            setTimeout(() => {
                cb().then(data => finallyHandler(data, false))
                    .catch(error => finallyHandler(error, true))
            }, this.options.delay || 10)
        })
    }
}
