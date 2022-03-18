/**
 * 引入 JavaScript
 * @BrowserOnly
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
