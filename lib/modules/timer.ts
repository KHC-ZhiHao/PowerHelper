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

    setPositive(positive: boolean) {
        this.positive = positive
        return this
    }

    getTime() {
        return this.nowTime
    }

    setTime(ms: number) {
        this.nowTime = ms
        return this
    }

    addTime(ms: number) {
        this.nowTime += ms
        return this
    }

    subtractTime(ms: number) {
        this.nowTime -= ms
        return this
    }

    getHours() {
        return this.nowTime / 1000 / 60 / 60
    }

    getMinutes() {
        return this.nowTime / 1000 / 60 % 60
    }

    getSeconds() {
        return this.nowTime / 1000 % 60
    }

    getMicroseconds() {
        return this.nowTime % 1000
    }

    getTimeString(format = 'hh:mm:ss.ff') {
        let hours = Math.floor(this.getHours()).toString().padStart(2, '0')
        let minutes = Math.floor(this.getMinutes()).toString().padStart(2, '0')
        let seconds = Math.floor(this.getSeconds()).toString().padStart(2, '0')
        let microseconds = Math.floor(this.getMicroseconds() / 10).toString().padStart(2, '0')
        return format.replace('hh', hours).replace('mm', minutes).replace('ss', seconds).replace('ff', microseconds)
    }
}
