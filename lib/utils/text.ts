import { Whitespace, VarParameters } from '../types/string'

/**
 * Text 開頭是否符合目標。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#headmatch
 */

export function headMatch(text: string, match: string) {
    return text.slice(0, match.length) === match
}

/**
 * Text 結尾是否符合目標。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#lastmatch
 */

export function lastMatch(text: string, match: string) {
    return text.slice(match.length * -1) === match
}

/**
 * 獲取指定 Text 的 Byte 長度。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#bytelength
 */

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
 * 複寫 Text 的指定變數。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#replacevar
 */

export function replaceVar<
    S extends string,
    E extends string,
    T extends string
>({ start, end, text, vars, dafaultVar }: {
    /** 變數起始符號 */
    start: S extends '' ? never : S extends Whitespace ? never : S,
    /** 變數終止符號 */
    end: E extends '' ? never : E extends Whitespace ? never : E,
    /** 複寫文本 */
    text: T
    /** 複寫變數 */
    vars: Partial<VarParameters<S, E, T>>
    /** 如果找不到對應資料的預設值 */
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    let data = vars ? vars[varKey.trim()]?.toString() : null
                    if (data) {
                        output += data
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

/**
 * 轉換 Text 轉換成指定格式，填入 v 代表映射的值。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#format
 */

export const format = (format: string, text: string, def = '-') => {
    let index = 0
    let output = ''
    for (let i = 0; i < format.length; i++) {
        let t = format[i]
        if (t === 'v') {
            output += text[index] == null ? def : text[index]
            index += 1
        } else {
            output += format[i]
        }
    }
    return output
}
