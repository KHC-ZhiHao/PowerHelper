import { Whitespace, VarParameters } from '../types/string'

/** 獲取指定字串的 Byte 長度 */

export function byteLength(text: string) {
    let size = text.length
    for (let i = text.length - 1; i >= 0; i--) {
        let code = text.charCodeAt(i)
        if (code > 0x7f && code <= 0x7ff) {
            size++
        } else if (code > 0x7ff && code <= 0xffff) {
            size += 2
        }
        if (code >= 0xDC00 && code <= 0xDFFF) {
            i--
        }
    }
    return size
}

/**
 * 複寫字串的指定變數。
 * @example
 * let result = replaceVar({
 *  start: '{',
 *  end: '}',
 *  text: '你好我是 {name}，目前是 {job}。',
 *  vars: {
 *    name: 'dave',
 *    job: 'rd'
 *  },
 *  dafaultVar: '-'
 * })
 * console.log(result) // 你好我是 dave，目前是 rd。
 */

export function replaceVar<
    S extends string,
    E extends string,
    T extends string
>({ start, end, text, vars, dafaultVar }: {
    /** 複寫起始符號 */
    start: S extends '' ? never : S extends Whitespace ? never : S,
    /** 複寫終止符號 */
    end: E extends '' ? never : E extends Whitespace ? never : E,
    /** 複寫文本 */
    text: T
    /** 複寫變數 */
    vars: Partial<VarParameters<S, E, T>>
    /** 如果沒有定義變數則覆蓋預設值 */
    dafaultVar?: string
}) {
    let isStart = false
    let output = ''
    let varKey = ''
    let startFirstUnit = start[0]
    let endFirstUnit = end[0]
    for (let i = 0; i < text.length; i++) {
        let unit = text[i]
        if (isStart) {
            if (unit === endFirstUnit) {
                let isEnd = text.slice(i, i + end.length) === end
                if (isEnd) {
                    i += end.length - 1
                    // @ts-ignore
                    let data = vars[varKey.trim()]
                    if (data) {
                        output += data.toString()
                    } else if (dafaultVar) {
                        output += dafaultVar
                    }
                    varKey = ''
                    isStart = false
                    continue
                }
            }
            varKey += unit
        } else {
            // 進入匹配
            if (unit === startFirstUnit) {
                isStart = text.slice(i, i + start.length) === start
                if (isStart) {
                    i += start.length - 1
                    continue
                }
            }
            output += text[i]
        }
    }
    return isStart ? output + start + varKey : output
}
