import { Event } from 'power-helper'
import { parseMessage } from '../../utils/message-parser'

type Channels = {
    fail: {
        error: any
        message: string
    }
}

type Options = {
    customPaser: (_data: any) => string | null
    defaultError: () => string
}

export class ServiceException extends Event<Channels> {
    private serviceName: string
    private parent: ServiceException | null = null
    private options: Options = {
        customPaser: () => null,
        defaultError: () => 'Error!'
    }
    constructor(serviceName: string, options?: Partial<Options>) {
        super()
        this.serviceName = serviceName
        if (options) {
            Object.assign(this.options, options)
        }
    }

    _setParent(serviceException: ServiceException) {
        this.parent = serviceException
    }

    _getRootModule(): ServiceException {
        return this.parent == null ? this : this.parent._getRootModule()
    }

    get fullName(): string {
        return this.parent == null ? this.serviceName : `${this.parent.fullName}/${this.serviceName}`
    }

    parseMessage(data: any): string {
        let custom = this.options.customPaser(data)
        if (custom) {
            return custom
        }
        return parseMessage(data, this.options.defaultError())
    }

    fail(error: any) {
        const message = this.parseMessage(error)
        this._getRootModule().emit('fail', {
            error,
            message
        })
        return new Error(`${this.fullName}: ${message}`)
    }

    checkout(serviceName: string) {
        let child = new ServiceException(serviceName, this.options)
        child._setParent(this)
        return child
    }
}
