import { Event } from './event'
import { devError } from '../base'

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

type Events = {
    processFail: {
        processName: string
        error: any
    }
}

/**
 * 可以建立多個定時執行系統，且能保證不重複執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/schedule.md
 */

export class Schedule extends Event<Events> {
    private int = setInterval(() => this._run(), 100)
    private isStop = false
    private lastTime = Date.now()
    private processes: Process[] = []
    private _run() {
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

    /** 直接執行指定的程序，如果該程序正在運行中，則跳過 */

    run(name: string) {
        let process = this.processes.find(e => e.name === name)
        if (process != null && process.runningTime == null) {
            process.now = process.sec
            this._run()
        }
    }

    /** 加入一個程序，不能重複已存在的命名 */

    add(name: string, intervalMs: number, callback: () => Promise<any>) {
        if (this.processes.find(e => e.name === name)) {
            devError('add', `Name ${name} already exists.`)
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
            devError('add', `Name ${name} not found.`)
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
