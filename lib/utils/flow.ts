/**
 * 流程控制的工具。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md
 */

export const flow = {
    /**
     * 直接運行方法並返回結果。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#run
     */

    run: <T extends () => any>(cb: T): ReturnType<T> => {
        return cb()
    },

    /**
     * 停止執行指定時間(毫秒)。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#sleep
     */

    sleep: (ms: number) => {
        return new Promise(resolve => {
            setTimeout(() => resolve(null), ms)
        })
    },

    /**
     * 求整數範圍內的隨機值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#randomint
     */

    randomInt: (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    },

    /**
     * 建立一組隨機的 v4 uuid。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createuuid
     */

    createUuid: () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
            return crypto.randomUUID()
        }
        let now = Date.now()
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (now + Math.random() * 16) % 16 | 0
            now = Math.floor(now / 16)
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
    },

    /**
     * 建立一組隨機的 v4 uuid，但在前面加上當下的 timestamp(ms)。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createwithtsuuid
     */

    createWithTsUuid: () => {
        return `${Date.now()}-${flow.createUuid()}`
    },

    /**
     * 優雅的設計有限的重複執行直到成功為止。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#retry
     */

    retry: async<T>(params: {
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
                await flow.sleep(params.interval)
            }
        }
        throw fails
    },

    /**
     * 結合非同步與計數的迴圈操作。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#asyncwhile
     */

    asyncWhile: async(cb: (_context: {
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
    },

    /**
     * 等待直到條件成立。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#waitfor
     */

    waitFor: <T>(params: {
        interval: number
        handler: (_resolve: (_value: T) => void, _reject: (_error: any) => void) => Promise<void>
    }) => {
        return new Promise((resolve, reject) => {
            const state = {
                done: false
            }
            const success = (value: T) => {
                state.done = true
                resolve(value)
            }
            const fail = (error: any) => {
                state.done = true
                reject(error)
            }
            const load = async() => {
                try {
                    await params.handler(success, fail)
                } catch (error) {
                    fail(error)
                }
                if (!state.done) {
                    setTimeout(load, params.interval)
                }
            }
            load()
        })
    }
}
