import { Event } from './event'

type Color = 'default' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'cyan' | 'white'
type ImportantLevel = 0 | 1 | 2 | 3
type Channels = {
    print: {
        time: string
        name: string
        data: any
        step: number
        color: string
        message: string
        importantLevel: ImportantLevel
    }
}

let nodeColors: Record<Color, string> = {
    default: '',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    black: '\x1b[30m',
    white: '\x1b[37m',
    green: '\x1b[32m',
    yellow: '\x1b[33m'
}

export class Log extends Event<Channels> {
    private step = 0
    private name
    private isSilence: boolean = false
    constructor(name: string, options?: {
        silence?: boolean
    }) {
        super()
        this.name = name
        if (options) {
            if (options.silence != null) {
                this.silence(options.silence)
            }
        }
    }

    private getNow() {
        return (new Date()).toISOString().split(/T|\./).slice(0, 2).join(' ')
    }

    private toPrintString(time: string, content: string) {
        return `[${time}][${this.name}] ${this.step}: ${content}`
    }

    silence(active = true) {
        this.isSilence = active
    }

    print(data: any, options: {
        color?: Color
        importantLevel?: ImportantLevel
    } = {}) {
        this.step += 1
        let now = this.getNow()
        let color: Color = options.color || 'default'
        let importantLevel: ImportantLevel = options.importantLevel || 0
        let message = this.toPrintString(now, data)
        let output = {
            time: now,
            name: this.name,
            step: this.step,
            data,
            color,
            message,
            importantLevel
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
