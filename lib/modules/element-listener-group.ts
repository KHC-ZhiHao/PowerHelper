/* eslint-disable no-undef */
import { createUuid } from '../utils/flow'

type EventMap<T extends Element | Document | Window | Worker> =
    T extends Window ? WindowEventMap :
    T extends Document ? DocumentEventMap :
    T extends SVGAElement ? SVGElementEventMap :
    T extends HTMLMediaElement ? HTMLMediaElementEventMap :
    T extends HTMLBodyElement ? HTMLBodyElementEventMap :
    T extends HTMLElement ? HTMLElementEventMap :
    T extends Worker ? WorkerEventMap : ElementEventMap

/**
 * 將 element 的 addEventListener 昇華到更好操作的階段。
 * @BrowserOnly
 */

export class ElementListenerGroup<T extends Element | Document | Window | Worker> {
    private elements: T[] = []
    private listeners = new Map<string, {
        name: string
        callback: (...args: any[]) => void
        options?: any
    }>()

    constructor(element?: T) {
        if (element) {
            this.elements.push(element)
        }
    }

    /** 加入一個新的監聽對象 */

    observe(element: T) {
        this.elements.push(element)
        for (let listener of this.listeners.values()) {
            element.addEventListener(listener.name, listener.callback, listener.options)
        }
    }

    /** 移除指定 ID 的監聽 */

    off(listenerId: string) {
        let listener = this.listeners.get(listenerId)
        if (listener) {
            this.listeners.delete(listenerId)
            for (let element of this.elements) {
                element.removeEventListener(listener.name, listener.callback)
            }
        }
    }

    /** 加入一個監聽的項目 */

    add<K extends keyof EventMap<T>>(name: K, callback: (event: EventMap<T>[K]) => void, options?: any) {
        const id = createUuid()
        const data = {
            name: name as string,
            options,
            callback: callback as any
        }
        this.listeners.set(id, data)
        this.elements.forEach(e => e.addEventListener(data.name, data.callback, options))
        return {
            id,
            off: () => this.off(id)
        }
    }

    /** 清空現在監聽的項目 */

    clear() {
        for (let id of this.listeners.keys()) {
            this.off(id)
        }
    }
}
