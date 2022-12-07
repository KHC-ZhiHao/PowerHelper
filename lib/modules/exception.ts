import { Event } from './event'

type Channels = {
    fail: {
        error: any
        message: string
    }
}

type Options = {
    defaultError: () => string
    parseMessage: (error: any) => string | null
}

export class Exception extends Event<Channels> {
    private serviceName: string
    private parent: Exception | null = null
    private options: Options = {
        defaultError: () => 'Error!',
        parseMessage: (error) => error
    }
    constructor(serviceName: string, options?: Partial<Options>) {
        super()
        this.serviceName = serviceName
        if (options) {
            Object.assign(this.options, options)
        }
    }

    static get basicMessageParser() {
        return (data: any): string | null => {
            if (typeof data === 'string') {
                return data
            }
            if (data.name === 'AxiosError') {
                if (typeof data.response?.data === 'string') {
                    return data.response.data
                }
                if (typeof data.response?.data?.message === 'string') {
                    return data.response?.data?.message
                }
                if (typeof data.response?.data?.error === 'string') {
                    return data.response?.data?.error
                }
            }
            let message = data.message
            if (message) {
                if (typeof message === 'string') {
                    return message
                }
            }
            return null
        }
    }

    protected _setParent(serviceException: Exception) {
        this.parent = serviceException
    }

    protected _getParents(): Exception[] {
        return this.parent == null ? [] : [this.parent, ...this.parent._getParents()]
    }

    private get fullName(): string {
        return this.parent == null ? this.serviceName : `${this.parent.fullName}/${this.serviceName}`
    }

    /** 解析錯誤訊息 */

    parseMessage(data: any): string {
        let message = this.options.parseMessage(data)
        if (message) {
            return message
        } else {
            return this.options.defaultError()
        }
    }

    /** 建立一個 Error */

    create(error: any) {
        const message = this.parseMessage(error)
        const fail = {
            error,
            message
        }
        this._getParents().concat([this]).forEach(e => e.emit('fail', fail))
        return new Error(`${this.fullName}: ${message}`)
    }

    /** 切出一個 exception，有利於上下文追蹤 */

    checkout(childName: string) {
        let child = new Exception(childName, this.options)
        child._setParent(this)
        return child
    }
}
