import { Ticker } from './ticker'

export class Timer extends Ticker {
    private nowTime = 0
    private minTime = 0
    private maxTime = 999999999999
    private positive = true
    constructor() {
        super(1, { autoPlay: false })
        this.on('next', ({ timeGap }) => {
            if (this.positive) {
                this.nowTime += timeGap
            } else {
                this.nowTime -= timeGap
            }
            if (this.nowTime <= this.minTime) {
                this.nowTime = this.minTime
            }
            if (this.nowTime >= this.maxTime) {
                this.nowTime = this.maxTime
            }
        })
    }

    /* 設定正向倒數或是反向 */

    setPositive(positive: boolean) {
        this.positive = positive
        return this
    }

    /* 設定最小時間 */

    setMinTime(ms: number) {
        this.minTime = ms
    }

    /* 設定最大時間 */

    setMaxTime(ms: number) {
        this.maxTime = ms
    }

    /* 獲取現在執行時間(毫秒) */

    getTime() {
        return this.nowTime
    }

    /* 設定執行時間(毫秒) */

    setTime(ms: number) {
        this.nowTime = ms
        return this
    }

    /* 增加執行時間(毫秒) */

    addTime(ms: number) {
        this.nowTime += ms
        return this
    }

    /* 減少執行時間(毫秒) */

    subtractTime(ms: number) {
        this.nowTime -= ms
        return this
    }

    /* 獲取現在計時的小時 */

    getHours() {
        return this.nowTime / 1000 / 60 / 60
    }

    /* 獲取現在計時的分，每 60 一個循環 */

    getMinutes() {
        return this.nowTime / 1000 / 60 % 60
    }

    /* 獲取現在計時的秒，每 60 一個循環 */

    getSeconds() {
        return this.nowTime / 1000 % 60
    }

    /* 獲取現在計時的分，每 1000 一個循環 */

    getMicroseconds() {
        return this.nowTime % 1000
    }

    /* 獲取可以顯示用的時間字串，預設 format = hh:mm:ss.ff */

    getTimeString(format = 'hh:mm:ss.ff') {
        let hours = Math.floor(this.getHours()).toString().padStart(2, '0')
        let minutes = Math.floor(this.getMinutes()).toString().padStart(2, '0')
        let seconds = Math.floor(this.getSeconds()).toString().padStart(2, '0')
        let microseconds = Math.floor(this.getMicroseconds() / 10).toString().padStart(2, '0')
        return format.replace('hh', hours).replace('mm', minutes).replace('ss', seconds).replace('ff', microseconds)
    }
}
