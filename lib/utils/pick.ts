
/** 指定的值如果是 null，則回傳預設值 */

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
    return type
}

type PeelPath<
    N extends string,
    T extends Record<string, any>,
    K = keyof T
> = K extends string ? (
    T[K] extends Record<string, any> ?
        PeelPath<N extends '' ? K : `${N}.${K}`, T[K]> :
        N extends '' ? K : `${N}.${K}`
) | (N extends '' ? '' : N) : string

type PeelType<
    P extends string,
    T extends Record<string, any>
> = P extends `${infer H}.${infer S}` ? PeelType<S, T[H]> : T[P]

export const peel = <
    T extends Record<string, any>,
    C extends PeelPath<'', T>,
    R extends PeelType<C, T>
>(target: T, path: C): C extends '' ? T : (R | null) => {
    let units = (path as string).split(/[.[\]'"]/g).filter(s => s.trim() !== '')
    let output = target as any
    while(true) {
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
