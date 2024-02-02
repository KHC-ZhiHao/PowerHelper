/**
 * 優雅的 Dom 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md
 */

export const element = {
    /**
     * 透過執行階段注入 Javascript Tag，這個方法只允許在 Browser 中執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript
     */

    importScript: (url: string, options?: {
        appendBefore?: (_el: HTMLScriptElement) => void
    }) => new Promise((resolve, reject) => {
        let dom = window.document as any
        let script = dom.createElement('script')
        let elements = Array.from(window.document.getElementsByTagName('script'))
        for (let element of elements) {
            if (element.src === url) {
                return resolve(null)
            }
        }
        script.src = url
        if (options?.appendBefore) {
            options.appendBefore(script)
        }
        script.onload = resolve
        script.onerror = reject
        dom.body.appendChild(script)
    }),

    /**
     * 新增並將 Tag Append 至指定 Element，這個方法只允許在 Browser 中執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#createandappend
     */

    // eslint-disable-next-line no-undef
    createAndAppend: <T extends keyof HTMLElementTagNameMap>(tag: T, cb: (el: HTMLElementTagNameMap[T]) => any, target?: HTMLElement) => {
        let element = window.document.createElement(tag)
        cb(element)
        if (target) {
            target.appendChild(element)
        } else {
            window.document.body.appendChild(element)
        }
        return element
    },

    /**
     * 透過執行階段注入帶 stylesheet 的 Link Tag，這個方法只允許在 Browser 中執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importcss
     */

    importCss: (url: string, options?: {
        appendBefore?: (_el: HTMLLinkElement) => void
    }) => {
        return new Promise((resolve, reject) => {
            let dom = window.document
            let link = dom.createElement('link')
            let elements = Array.from(window.document.getElementsByTagName('link'))
            for (let element of elements) {
                if (element.href === url) {
                    return resolve(null)
                }
            }
            link.rel = 'stylesheet'
            link.href = url
            if (options?.appendBefore) {
                options.appendBefore(link)
            }
            link.onload = resolve
            link.onerror = reject
            dom.body.appendChild(link)
        })
    }
}
