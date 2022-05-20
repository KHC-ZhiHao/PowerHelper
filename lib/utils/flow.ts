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

export const randomPick = <T extends any>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)]
}

/**
 * 求整數範圍內的隨機值
 */

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 反覆執行直到成功為止
 */

export const retry = async<T extends (index: number) => Promise<any>>(params: {
    /**
     * 要重試幾次
     * @default 1
     */
    max?: number
    /** 錯誤時呼叫此事件 */
    onFail?: (index: number, error: any) => void
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

export const asyncWhile = async(cb: (context: {
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
    while (true) {
        await cb(context)
        if (isBreak) {
            break
        }
        context.count += 1
    }
}
