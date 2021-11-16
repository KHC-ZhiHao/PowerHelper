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
