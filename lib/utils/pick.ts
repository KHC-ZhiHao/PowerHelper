import { Whitespace, VarParameters } from '../types/string.js'
import { PeelType } from '../types/pick.js'

/**
 * 精準地提取目標相關資源。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md
 */

export const pick = {
    /**
     * 值如果是 null | undefined | Error | NaN，則回傳預設值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifbad
     */
    ifBad: <T>(data: T | undefined | null | Error, def: T) => {
        const type = pick.getType(data)
        const defs = ['empty', 'NaN', 'error']
        return defs.includes(type) ? def : data
    },
    /**
     * 值如果是 null | undefined，則回傳預設值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifempty
     */
    ifEmpty: <T>(data: T | undefined | null, def: T): T => {
        return (data != null ? data : def)
    },
    /**
     * 比 typeof 回傳更精準的類型。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#gettype
     */
    getType: (target: any):
      'string'
      | 'number'
      | 'bigint'
      | 'boolean'
      | 'symbol'
      | 'object'
      | 'function'
      | 'empty'
      | 'array'
      | 'NaN'
      | 'regexp'
      | 'promise'
      | 'buffer'
      | 'error' => {
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
    },
    /**
     * 獲取指定路徑的值，如果值不存在回傳 `null`。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#peel
     */
    peel: <
        T extends Record<string, any> = Record<'', any>,
        C extends string = '',
        R = PeelType<C, T>
    >(target: T, path: C): C extends '' ? T : (R | null) => {
        let units = (path as unknown as string).split(/[.[\]'"]/g).filter(s => s.trim() !== '')
        let output = target as any

        while (true) {
            if (units.length === 0) {
                return output
            }
            if (pick.getType(output) !== 'object') {
                return null as any
            }
            let key = units.shift()
            if (key) {
                output = output[key]
            }
        }
    },
    /**
     * 獲取文字裡面的變數列表。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#vars
     */
    vars: <
        S extends string,
        E extends string,
        T extends string
    >({ start, end, text }: {
        /** 複寫起始符號 */
        start: S extends '' ? never : S extends Whitespace ? never : S
        /** 複寫終止符號 */
        end: E extends '' ? never : E extends Whitespace ? never : E
        /** 複寫文本 */
        text: T
    }): (keyof VarParameters<S, E, T> extends never ? string : keyof VarParameters<S, E, T>)[] => {
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
}
