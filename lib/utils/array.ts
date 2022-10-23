
/**
 * 將陣列依照數量集成一組
 * @see
 */

export const groups = <T>(size: number, data: T[]): T[][] => {
    let result: T[][] = []
    for (let i = 0; i < data.length; i += size) {
        result.push(data.slice(i, i + size))
    }
    return result
}

/**
 * 隨機獲取陣列內的一個值
 */

export const randomPick = <T>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)]
}

/**
 * 隨機獲取陣列內的一個組
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
