import { Base } from '../module-base'

type Process = {
    sec: number
    now: number
    name: string
    executedCount: number
    runningTime: number | null
    handler: () => Promise<any>
}

export class Schedule extends Base {
    private int = setInterval(() => this.run(), 100)
    private isStop = false
    private lastTime = Date.now()
    private processes: Process[] = []

    constructor() {
        super('Schedule')
    }

    private run() {
        if (this.isStop) {
            return null
        }
        let time = Date.now()
        let diffTime = time - this.lastTime
        this.lastTime = time
        for (let process of this.processes) {
            if (process.runningTime) {
                continue
            }
            process.now += diffTime
            if (process.now >= process.sec) {
                process.now = 0
                process.runningTime = Date.now()
                process.executedCount += 1
                process
                    .handler()
                    .catch(e => this.$devWarn(process.name, e))
                    .finally(() => {
                        process.runningTime = null
                    })
            }
        }
    }

    add(name: string, intervalMs: number, callback: () => Promise<any>) {
        if (this.processes.find(e => e.name === name)) {
            this.$devError('add', `Name ${name} already exists.`)
        }
        this.processes.push({
            sec: intervalMs,
            now: 0,
            name,
            executedCount: 0,
            runningTime: null,
            handler: callback
        })
    }

    remove(name: string) {
        if (this.processes.find(e => e.name === name) == null) {
            this.$devError('add', `Name ${name} not found.`)
        }
        this.processes = this.processes.filter(e => e.name !== name)
    }

    info() {
        return this.processes.map(e => {
            return {
                name: e.name,
                runningTime: e.runningTime,
                executedCount: e.executedCount
            }
        })
    }

    stop() {
        this.isStop = true
    }

    play() {
        this.isStop = false
    }

    close() {
        clearInterval(this.int)
    }
}
