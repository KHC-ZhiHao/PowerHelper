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

/**
 * 狀態管理的情境下，位於為某種情境導致舊請求還沒成功就發送新的請求，在關聯效能有差異的情形下，可能會發生新請求比舊請求還早接受 commit 資料，造成狀態顯示不對，Promise Overlap 能夠控制同一種情境下只獲取第一次或是最後一次的結果。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/promise-overlap.md
 */

export class PromiseOverlap<T> {
    private pick: Pick
    private options: Options
    private processes: Process[] = []

    constructor(pick: Pick, options: Options = {}) {
        this.pick = pick
        this.options = options
    }

    /** 執行目標 promise */
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
