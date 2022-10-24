import { Whitespace, VarParameters } from '../types/string'
import { PeelPath, PeelType } from '../types/pick'

/** 指定的值如果是 null | undefined，則回傳預設值 */

export const ifEmpty = <T>(data: T | undefined, def: T): T => {
    return (data != null ? data : def)
}

/** 比 typeof 回傳更精準的類型 */

export const getType = (target: any) => {
    let type = typeof target
    if (target == null) {
        return 'empty'
    }
    if (Array.isArray(target)) {
        return 'array'
    }
    if (type === 'number' && isNaN(target)) {
        return 'NaN'
    }
    if (target instanceof RegExp) {
        return 'regexp'
    }
    if (target instanceof Promise) {
        return 'promise'
    }
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(target)) {
        return 'buffer'
    }
    if (target instanceof Error) {
        return 'error'
    }
    return type as 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'object' | 'function'
}

/**
 * 獲取指定路徑的值
 * @see https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Optional_chaining
 */

export const peel = <
    T extends Record<string, any>,
    C extends PeelPath<'', T>,
    R extends PeelType<C, T>
>(target: T, path: C): C extends '' ? T : (R | null) => {
    let units = (path as string).split(/[.[\]'"]/g).filter(s => s.trim() !== '')
    let output = target as any
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (units.length === 0) {
            return output
        }
        if (getType(output) !== 'object') {
            return null as any
        }
        let key = units.shift()
        if (key) {
            output = output[key]
        }
    }
}

/**
 * 複寫字串的指定變數。
 * @example
 * let result = pickVar({
 *  start: '{',
 *  end: '}',
 *  text: '你好我是 {name}，目前是 {job}。'
 * })
 * console.log(result) // ['name', 'job']
 */

export function pickVar<
    S extends string,
    E extends string,
    T extends string
>({ start, end, text }: {
    /** 複寫起始符號 */
    start: S extends '' ? never : S extends Whitespace ? never : S,
    /** 複寫終止符號 */
    end: E extends '' ? never : E extends Whitespace ? never : E,
    /** 複寫文本 */
    text: T
}): (keyof VarParameters<S, E, T>)[] {
    let isStart = false
    let output: string[] = []
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
                    output.push(varKey)
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
        }
    }
    return output as any
}
