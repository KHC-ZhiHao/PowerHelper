/**
 * 優雅的 Array 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md
 */
export const array = {
    /**
     * 將 Array 依照指定數量集成一組。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#groups
     */

    groups: <T>(size: number, items: T[]): T[][] => {
        let result: T[][] = []
        for (let i = 0; i < items.length; i += size) {
            result.push(items.slice(i, i + size))
        }
        return result
    },

    /**
     * 從 Array 中隨機獲取一個值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompick
     */

    randomPick: <T>(items: T[]): T => {
        return items[Math.floor(Math.random() * items.length)]
    },

    /**
     * 從 Array 中隨機獲取指定數量且不重複的值，如果指定數量大於 Array 長度時會傳整組 Array。
     * @param take 指定獲取數量。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompicks
     */

    randomPicks: <T>(take: number, items: T[]): T[] => {
        if (items.length <= take) {
            return items.slice()
        }
        let outputs: T[] = []
        let loop = items.length * 100
        while (loop > 0) {
            if (outputs.length >= take) {
                break
            }
            loop -= 1
            let item = array.randomPick(items)
            if (outputs.includes(item) === false) {
                outputs.push(item)
            }
        }
        return outputs
    },

    /**
     * 移除 Array 中相同的元素。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#unique
     */

    unique: <T extends Array<any>>(items: T): T => {
        return [...new Set(items)] as T
    },

    /**
     * 允許非同步進行的 map。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#asyncmap
     */

    asyncMap: async <T, R>(items: T[], cb: (_item: T) => Promise<R>): Promise<R[]> => {
        let output = []
        for (let item of items) {
            let result = await cb(item)
            output.push(result)
        }
        return output
    },

    /**
     * 如果 Array 沒有指定的值，加入該值，如果有則移除。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#check
     */

    check: <T>(items: T[], value: T) => {
        if (items.includes(value)) {
            return items.filter(e => e !== value)
        } else {
            return [...items, value]
        }
    }
}