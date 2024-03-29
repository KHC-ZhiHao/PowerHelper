import { Event } from './event'

type Job = {
    name: string
    handler: () => Promise<any>
}

type Events = {
    allDone: Record<string, unknown>
    error: {
        name: string
        error: any
    }
}

type Params = {
    autoPlay?: boolean
    concurrentExecutions: number
}

/**
 * 有限的批次執行作業。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/jobs-queue.md
 */

export class JobsQueue extends Event<Events> {
    private jobs: Job[] = []
    private closed = false
    private params: Params
    private isStop = false
    private runningCount = 0
    constructor(params: Params) {
        super()
        this.params = params
        if (this.params.autoPlay === false) {
            this.isStop = true
        }
    }

    /** 現有的 jobs 長度 */

    get size() {
        return this.jobs.length + this.runningCount
    }

    private run() {
        if (this.isStop) {
            return null
        }
        if (this.closed) {
            return null
        }
        if (this.params.concurrentExecutions && this.runningCount >= this.params.concurrentExecutions) {
            return null
        }
        let job = this.jobs.shift()
        if (job) {
            this.runningCount += 1
            job.handler()
                .catch(e => {
                    this.emit('error', {
                        name: job?.name || '',
                        error: e
                    })
                })
                .finally(() => {
                    this.less()
                    this.run()
                })
        }
    }

    private less() {
        this.runningCount -= 1
        if (this.runningCount <= 0) {
            this.runningCount = 0
        }
        if (this.size === 0) {
            this.emit('allDone', {})
        }
    }

    get isStoped() {
        return this.isStop
    }

    /** 將一組 job 新增至 queue 末端 */

    push(name: string, handler: Job['handler']) {
        if (this.closed === false) {
            this.jobs.push({ name, handler })
            this.run()
        }
    }

    /** 暫停 queue */

    stop() {
        this.isStop = true
    }

    /** 恢復 queue */

    play() {
        if (this.isStop) {
            this.isStop = false
            this.run()
        }
    }

    /** 將一組 job 新增至 queue 末端，同時回應一組 promise 可以等待直到該任務完成為止。 */

    pushAndWait(name: string, handler: Job['handler']): Promise<null> {
        return new Promise((resolve, reject) => {
            if (this.closed) {
                return resolve(null)
            }
            this.jobs.push({
                name,
                handler: async () => {
                    try {
                        await handler()
                        resolve(null)
                    } catch (e) {
                        reject(e)
                    }
                }
            })
            this.run()
        })
    }

    /** 將一組 job 新增至最優先級 */

    unshift(name: string, handler: Job['handler']) {
        if (this.closed === false) {
            this.jobs.unshift({ name, handler })
            this.run()
        }
    }

    /** 清空現有的 jobs */

    clear() {
        this.jobs = []
    }

    /** 關閉這組 queue ，將無效化 push, unshift，且清空現有的 jobs */

    close() {
        this.clear()
        this.closed = true
    }
}
