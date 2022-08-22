import { Event } from './event'

type Info = {
    /** 程序名稱 */
    name: string
    /** 運行當下時間，如果為 null 則尚未運行 */
    runningTime: number | null
    /** 執行次數 */
    executedCount: number
}

type Process = {
    sec: number
    now: number
    name: string
    executedCount: number
    runningTime: number | null
    handler: () => Promise<any>
}

type Channels = {
    'processFail': {
        processName: string
        error: any
    }
}

export class Schedule extends Event<Channels> {
    private int = setInterval(() => this.run(), 100)
    private isStop = false
    private lastTime = Date.now()
    private processes: Process[] = []
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
                    .then(() => {
                        process.runningTime = null
                    })
                    .catch(e => {
                        process.runningTime = null
                        this.emit('processFail', {
                            processName: process.name,
                            error: e
                        })
                    })
            }
        }
    }

    /** 加入一個程序，不能重複已存在的命名 */

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

    /** 驗證程序是否存在 */

    has(name: string) {
        return !!this.processes.find(e => e.name === name)
    }

    /** 刪除指定的程序 */

    remove(name: string) {
        if (this.processes.find(e => e.name === name) == null) {
            this.$devError('add', `Name ${name} not found.`)
        }
        this.processes = this.processes.filter(e => e.name !== name)
    }

    /** 獲取現在所有正在運作的程序 */

    info(): Info[] {
        return this.processes.map(e => {
            return {
                name: e.name,
                runningTime: e.runningTime,
                executedCount: e.executedCount
            }
        })
    }

    /** 暫停計時，正在運行中的程序不受限制 */

    stop() {
        this.isStop = true
    }

    /** 假如是暫停狀態可以透過 play 繼續計時 */

    play() {
        this.isStop = false
    }

    /** 關閉計時器 */

    close() {
        clearInterval(this.int)
    }
}
