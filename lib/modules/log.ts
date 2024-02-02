import { Event } from './event'

type Color = 'default' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'cyan' | 'white'
type LogType = 'normal' | 'dev' | 'super-error' | 'error' | 'warning' | 'fixme' | 'todo'
type Events = {
    print: {
        time: string
        name: string
        data: any
        step: number
        color: Color
        message: string
        silence: boolean
        logType: LogType
    }
}

const nodeColors: Record<Color, string> = {
    default: '',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    black: '\x1b[30m',
    white: '\x1b[37m',
    green: '\x1b[32m',
    yellow: '\x1b[33m'
}

/**
 * 一種更高階打印出 Log 的模組，不只是你可以控制他是否要在指定環境中顯示，甚至可以建立監聽打印事件。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/log.md
 */

export class Log extends Event<Events> {
    private step = 0
    private name
    private isSilence = false
    private defaultLogType: LogType = 'normal'
    constructor(name: string, options?: {
        /** 是否預設為 silence 狀態 */
        silence?: boolean
        /** 如果不指定 LogType 則預設此設定值 */
        defaultLogType?: LogType
    }) {
        super()
        this.name = name
        if (options) {
            if (options.silence != null) {
                this.silence(options.silence)
            }
            if (options.defaultLogType != null) {
                this.defaultLogType = options.defaultLogType
            }
        }
    }

    private getNow() {
        return (new Date()).toISOString().split(/T|\./).slice(0, 2).join(' ')
    }

    private toPrintString(time: string, logType: LogType, content: string) {
        return `[${time}][${this.name}][${logType}] ${this.step}: ${content}`
    }

    /**
     * 可以繼續呼叫 print 但不會打印 log。
     */

    silence(active = true) {
        this.isSilence = active
    }

    /**
     * 打印 log。
     */

    print(data: any, options: {
        color?: Color
        logType?: LogType
    } = {}) {
        this.step += 1
        let now = this.getNow()
        let color: Color = options.color || 'default'
        let logType = options.logType || this.defaultLogType
        let message = this.toPrintString(now, logType, data)
        let output = {
            time: now,
            name: this.name,
            step: this.step,
            data,
            color,
            message,
            logType,
            silence: this.isSilence
        }
        this.emit('print', output)
        if (this.isSilence === false) {
            if (color === 'default') {
                console.log(message)
            } else if (typeof window === 'undefined') {
                console.log(`${nodeColors[color]}${message}\x1b[0m`)
            } else {
                console.log(`%c ${message}`, `color: ${color}`)
            }
        }
        return output
    }
}
