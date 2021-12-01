type Listeners = Record<string, {
    name: string
    lock: boolean
    callback: any
}>

type EventMap<T extends Element | Document | Window> =
    T extends Window ? WindowEventMap :
    T extends Document ? DocumentEventMap :
    T extends SVGAElement ? SVGElementEventMap :
    T extends HTMLMediaElement ? HTMLMediaElementEventMap :
    T extends HTMLBodyElement ? HTMLBodyElementEventMap :
    T extends HTMLElement ? HTMLElementEventMap : ElementEventMap

export class ElementListenerGroup<T extends Element | Document | Window> {
    private element: T
    private listeners: Listeners = {}
    constructor(element: T) {
        this.element = element
    }

    /** 加入一個監聽的項目 */

    add<K extends keyof EventMap<T>>(name: K, callback: (event: EventMap<T>[K]) => void, options?: any) {
        let id = Date.now().toString() + Math.floor(Math.random() * 1000000)
        let data = {
            name: name as string,
            lock: false,
            callback: callback as any
        }
        this.element.addEventListener(data.name, data.callback, options)
        this.listeners[id] = data
        const output = {
            /** 鎖定時不會被 clear 給移除 */
            lock: (active = true) => {
                data.lock = active
                return output
            },
            /** 關閉這組監聽對象 */
            off: () => {
                if (this.listeners[id]) {
                    this.element.removeEventListener(data.name, data.callback)
                    delete this.listeners[id]
                }
                return output
            }
        }
        return output
    }

    /** 清空現在監聽的項目，不包含已 lock 的對象 */

    clear() {
        for (let id in this.listeners) {
            let data = this.listeners[id]
            if (data.lock === false) {
                this.element.removeEventListener(this.listeners[id].name, this.listeners[id].callback)
                delete this.listeners[id]
            }
        }
    }
}
