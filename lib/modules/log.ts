import { Event } from './event'

type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'cyan' | 'white'
type ImportantLevel = 0 | 1 | 2 | 3
type Message = {
    time: string
    color: Color
    content: string
    importantLevel: ImportantLevel
}
type Channels = {
    print: {
        time: string
        name: string
        data: any
        color: string
        importantLevel: ImportantLevel
    }
}

let defaultColor: Color = 'white'
let nodeColors: Record<Color, string> = {
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
    private messages: Message[] = []
    private isSilence: boolean

    constructor(name: string, silence = false) {
        super()
        this.name = name
        this.isSilence = silence
    }

    static setDefaultColor(color: Color) {
        defaultColor = color
    }

    private getNow() {
        return (new Date()).toISOString().split(/T|\./).slice(0, 2).join(' ')
    }

    private toPrintString(time: string, content: string) {
        return `[${time}][${this.name}] ${this.step}: ${content}`
    }

    silence(silence: boolean) {
        this.isSilence = silence
    }

    print(data: any, options: {
        color?: Color
        importantLevel?: ImportantLevel
    } = {}) {
        let now = this.getNow()
        let color: Color = options.color || defaultColor
        let importantLevel: ImportantLevel = options.importantLevel || 0
        this.step += 1
        this.emit('print', {
            time: now,
            name: this.name,
            data,
            color,
            importantLevel
        })
        if (this.messages.length >= 1000) {
            this.messages.shift()
        }
        this.messages.push({
            time: now,
            color,
            content: data,
            importantLevel
        })
        if (this.isSilence === false) {
            if (typeof window === 'undefined') {
                console.log(`${nodeColors[color]}${this.toPrintString(now, data)}\x1b[0m`)
            } else {
                console.log(`%c ${this.toPrintString(now, data)}`, `color: ${color}`)
            }
        }
    }

    export() {
        return this.messages.map(e => this.toPrintString(e.time, e.content))
    }

    exportDetail() {
        return this.messages.slice()
    }
}
