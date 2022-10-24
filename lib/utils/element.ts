/**
 * 透過執行階段注入 Javascript Tag，這個方法只允許在 Browser 中執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript
 */

export const importScript = (url: string) => new Promise((resolve, reject) => {
    let dom = window.document as any
    let script = dom.createElement('script')
    let elements = Array.from(window.document.getElementsByTagName('script'))
    for (let element of elements) {
        if (element.src === url) {
            return resolve(null)
        }
    }
    script.onload = resolve
    script.onerror = reject
    script.src = url
    dom.body.appendChild(script)
})

/**
 * 新增並將 Tag Append 至指定 Element，這個方法只允許在 Browser 中執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#createandappend
 */

// eslint-disable-next-line no-undef
export const createAndAppend = <T extends keyof HTMLElementTagNameMap>(tag: T, cb: (el: HTMLElementTagNameMap[T]) => any, target?: HTMLElement) => {
    let element = window.document.createElement(tag)
    cb(element)
    if (target) {
        target.appendChild(element)
    } else {
        window.document.body.appendChild(element)
    }
    return element
}
