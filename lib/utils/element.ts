/**
 * 引入 JavaScript
 */

export const importScript = (url: string) => new Promise((resolve, reject) => {
    let dom = window.document as any
    let script = dom.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.src = url
    dom.body.appendChild(script)
})
