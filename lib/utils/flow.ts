/**
 * 停止執行指定時間(毫秒)
 */

export const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(null), ms)
    })
}

/**
 * 隨機獲取陣列內的一個值
 */

export const randomPick = <T extends any>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)]
}

/**
 * 求整數範圍內的隨機值
 */

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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
