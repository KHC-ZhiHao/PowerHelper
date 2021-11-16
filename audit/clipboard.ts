/**
 * 反白指定 element 的內文
 */

export const rangeSelect = (element: Element) => {
    let range = null
    let selection = null
    let textRange = (document.body as any).createTextRange
    if (textRange) {
        range = textRange()
        range.moveToElementText(element)
        range.select()
    } else if (window.getSelection) {
        selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
    }
}

/**
 * 取消現在反白的狀態
 */

export const rangeSelectCancel = () => {
    let select = (window.document as any).selection
    if (window.getSelection) {
        window.getSelection().removeAllRanges()
    }  else if (select) {
        select.empty()
    }
}

/**
 * 複製文本
 */

export const copy = (text: string) => {
    let textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.innerText = text
    textarea.select()
    textarea.focus()
    document.execCommand('copy')
    textarea.remove()
}

/**
 * 獲取文本檔案
 */

export function readFileText(file: File): Promise<string> {
    return new Promise(resolve => {
        let reader = new FileReader()
        reader.onload = event => resolve(event.target.result as string)
        reader.readAsText(file)
    })
}
