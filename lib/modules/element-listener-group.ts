type Listeners = Record<string, {
    name: string
    lock: boolean
    callback: any
}>

export class ElementListenerGroup<T extends Element> {
    private element: T
    private listeners: Listeners = {}
    constructor(element: T) {
        this.element = element
    }

    /** 加入一個監聽的項目 */

    add: T['addEventListener'] = (name: string, callback: (...args: any[]) => void, options?) => {
        let id = Date.now().toString() + Math.floor(Math.random() * 1000000)
        let data = {
            name,
            lock: false,
            callback
        }
        this.element.addEventListener(name, callback, options)
        this.listeners[id] = data
        return {
            /** 鎖定時不會被 clear 給移除 */
            lock: (active = true) => {
                data.lock = active
            },
            /** 關閉這組監聽對象 */
            off: () => {
                this.element.removeEventListener(name, callback)
                if (this.listeners[id]) {
                    delete this.listeners[id]
                }
            }
        }
    }

    /** 清空現在監聽的項目 */

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
