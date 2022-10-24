/**
 * 停止執行指定時間(毫秒)。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#sleep
 */

export const sleep = (ms: number) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(null), ms)
    })
}

/**
 * 求整數範圍內的隨機值。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#randomint
 */

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 建立一組隨機的 v4 uuid。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createuuid
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
 * 優雅的設計有限的重複執行直到成功為止。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#retry
 */

export const retry = async<T>(params: {
    /**
     * 要重試幾次
     * @default 1
     */
    max?: number
    /**
     * 錯誤時呼叫此事件
     */
    onFail?: (_index: number, _error: any) => void
    /**
     * 每次錯誤重試間格的等待時間(毫秒)
     * @default 0
     */
    interval?: number
    /** 執行過程，回傳 resolve 為成功， reject 為失敗進入下一次重試 */
    action: (_index: number) => Promise<T>
}): Promise<T> => {
    let count = 0
    let retryMax = params.max == null ? 1 : params.max
    let fails = [] as Array<{
        count: number
        error: any
    }>
    while (retryMax > 0) {
        try {
            let result = await params.action(count)
            return result
        } catch (error) {
            if (params.onFail) {
                params.onFail(count, error)
            }
            fails.push({
                count,
                error
            })
        }
        count += 1
        retryMax -= 1
        if (params.interval) {
            await sleep(params.interval)
        }
    }
    throw fails
}

/**
 * 結合非同步與計數的迴圈操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#asyncwhile
 */

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
