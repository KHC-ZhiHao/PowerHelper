type StyleKeys = keyof CSSStyleDeclaration

function toStyleCase(key: string) {
    return key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
}

/**
 * 方便組合出 HTML Element Style 的工具。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/style-string.md
 */

export class StyleString {
    private styles: Record<string, string> = {}

    /** 寫入 key */
    set(key: StyleKeys, value?: string, defaultValue?: string) {
        let v = value == null ? defaultValue : value
        if (v) {
            this.styles[key as string] = v
        }
    }

    /** 獲取指定 key 的值 */
    get(key: StyleKeys) {
        return this.styles[key as string]
    }

    /** 刪除指定的 key */
    remove(key: StyleKeys) {
        if (this.styles[key as string]) {
            delete this.styles[key as string]
        }
    }

    /** 從對象面附値 */
    assign(element: HTMLElement) {
        for (let [style, value] of Object.entries(this.styles)) {
            element.style[style as any] = value
        }
    }

    /** 獲得 style string */
    join(separator = ';') {
        let codes = []
        for (let [style, value] of Object.entries(this.styles)) {
            codes.push(`${toStyleCase(style)}:${value}`)
        }
        return codes.join(separator)
    }
}
