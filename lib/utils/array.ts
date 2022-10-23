
/**
 * 將 Array 依照指定數量集成一組。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#groups
 */

export const groups = <T>(size: number, items: T[]): T[][] => {
    let result: T[][] = []
    for (let i = 0; i < items.length; i += size) {
        result.push(items.slice(i, i + size))
    }
    return result
}

/**
 * 從 Array 中隨機獲取一個值。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompick
 */

export const randomPick = <T>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)]
}

/**
 * 從 Array 中隨機獲取指定數量且不重複的值，如果指定數量大於 Array 長度時會傳整組 Array。
 * @param take 指定獲取數量。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompicks
 */

export const randomPicks = <T>(take: number, items: T[]): T[] => {
    if (items.length <= take) {
        return items.slice()
    }
    let outputs: T[] = []
    let loop = items.length * 100
    while (loop > 0) {
        loop -= 1
        let item = randomPick(items)
        if (outputs.includes(item) === false) {
            outputs.push(item)
        }
        if (outputs.length >= take) {
            break
        }
    }
    return outputs
}
