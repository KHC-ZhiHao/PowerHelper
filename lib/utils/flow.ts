import { PromiseResponseType } from '../types/pick'

/**
 * 停止執行指定時間(毫秒)
 */

export const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(null), ms)
    })
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

/**
 * 求整數範圍內的隨機值
 */

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 建立一組隨機的 v4 uuid
 */

export const createUuid = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
    }
    let now = Date.now()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (now + Math.random() * 16) % 16 | 0
        now = Math.floor(now / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}

/**
 * 反覆執行直到成功為止
 */

export const retry = async<T extends (_index: number) => Promise<any>>(params: {
    /**
     * 要重試幾次
     * @default 1
     */
    max?: number
    /** 錯誤時呼叫此事件 */
    onFail?: (_index: number, _error: any) => void
    /**
     * 每次錯誤重試間格的等待時間(毫秒)
     * @default 0
     */
    interval?: number
    /** 總執行過程，回傳 resolve 為成功， reject 為失敗進入下一次重試 */
    action: T
}): Promise<PromiseResponseType<T>> => {
    let index = 0
    let retryMax = params.max == null ? 1 : params.max
    let fails = [] as Array<{
        index: number
        error: any
    }>
    while (retryMax > 0) {
        try {
            let result = await params.action(index)
            return result
        } catch (error) {
            if (params.onFail) {
                params.onFail(index, error)
            }
            fails.push({
                index,
                error
            })
        }
        index += 1
        retryMax -= 1
        if (params.interval) {
            await sleep(params.interval)
        }
    }
    throw fails
}

/** 非同步迴圈 */

export const asyncWhile = async(cb: (_context: {
    count: number
    doBreak: () => void
}) => Promise<any>) => {
    let isBreak = false
    let context = {
        count: 0,
        doBreak: () => {
            isBreak = true
        }
    }
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await cb(context)
        if (isBreak) {
            break
        }
        context.count += 1
    }
}
