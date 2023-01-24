import { Event } from './event'

type Job = {
    name: string
    handler: () => Promise<any>
}

type Channels = {
    allDone: Record<string, unknown>
    error: {
        name: string
        error: any
    }
}

type Params = {
    concurrentExecutions: number
}

export class JobQueues extends Event<Channels> {
    private jobs: Job[] = []
    private closed = false
    private runningCount = 0
    private params: Params
    constructor(params: Params) {
        super()
        this.params = params
    }

    /** 現有的 jobs 長度 */

    get size() {
        return this.jobs.length + this.runningCount
    }

    private run() {
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

    /** 將一組 job 新增至 queue 末端 */

    push(name: string, handler: Job['handler']) {
        if (this.closed === false) {
            this.jobs.push({ name, handler })
            this.run()
        }
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
