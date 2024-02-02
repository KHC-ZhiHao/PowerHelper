import { Event } from './event'

type Params<T> = {
    handler: () => Promise<T>
}

/**
 * 限制只執行一次的非同步程式
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/once.md
 */

export class Once<T> {
    private isDone = false
    private isError = false
    private event = new Event<{ onload: any }>()
    private response: T | null = null
    private params: Params<T>
    constructor(params: Params<T>) {
        this.params = params
    }

    /** 執行程式 */

    async run() {
        return new Promise((resolve, reject) => {
            const action = () => {
                if (this.isError) {
                    reject(this.response)
                } else {
                    resolve(this.response)
                }
            }
            if (this.isDone) {
                action()
            } else {
                this.event.on('onload', (data, context) => {
                    context.off()
                    action()
                })
                if (this.event.getEventListenerSize('onload') === 1) {
                    this.params
                        .handler()
                        .then(item => {
                            this.response = item
                        })
                        .catch(error => {
                            this.response = error
                            this.isError = true
                        })
                        .finally(() => {
                            this.isDone = true
                            this.event.emit('onload', {})
                        })
                }
            }
        })
    }

    /** 重置狀態 */

    reset() {
        this.isDone = false
        this.isError = false
        this.response = null
    }
}
