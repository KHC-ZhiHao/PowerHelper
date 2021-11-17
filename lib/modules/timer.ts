import { Ticker } from './ticker'

export class Timer extends Ticker {
    private nowTime = 0
    private positive = true
    constructor() {
        super(1, { autoPlay: false })
        this.on('next', () => {
            if (this.positive) {
                this.nowTime += 1
            } else {
                this.nowTime -= 1
            }
        })
    }
    
    /* 設定正向倒數或是反向 */
    
    setPositive(positive: boolean) {
        this.positive = positive
        return this
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

    /* 獲取可以顯示用的時間字串 */

    getTimeString(format = 'hh:mm:ss.ff') {
        let hours = Math.floor(this.getHours()).toString().padStart(2, '0')
        let minutes = Math.floor(this.getMinutes()).toString().padStart(2, '0')
        let seconds = Math.floor(this.getSeconds()).toString().padStart(2, '0')
        let microseconds = Math.floor(this.getMicroseconds() / 10).toString().padStart(2, '0')
        return format.replace('hh', hours).replace('mm', minutes).replace('ss', seconds).replace('ff', microseconds)
    }
}
