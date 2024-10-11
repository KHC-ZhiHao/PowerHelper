/**
 * 流程控制的工具。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md
 */
export declare const flow: {
    /**
     * 直接運行方法並返回結果。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#run
     */
    run: <T extends () => any>(cb: T) => ReturnType<T>;
    /**
     * 停止執行指定時間(毫秒)。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#sleep
     */
    sleep: (ms: number) => Promise<unknown>;
    /**
     * 求整數範圍內的隨機值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#randomint
     */
    randomInt: (min: number, max: number) => number;
    /**
     * 建立一組隨機的 v4 uuid。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createuuid
     */
    createUuid: () => string;
    /**
     * 建立一組隨機的 v4 uuid，但在前面加上當下的 timestamp(ms)。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createwithtsuuid
     */
    createWithTsUuid: () => string;
    /**
     * 優雅的設計有限的重複執行直到成功為止。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#retry
     */
    retry: <T_1>(params: {
        /**
         * 要重試幾次
         * @default 1
         */
        max?: number | undefined;
        /**
         * 錯誤時呼叫此事件
         */
        onFail?: ((_index: number, _error: any) => void) | undefined;
        /**
         * 每次錯誤重試間格的等待時間(毫秒)
         * @default 0
         */
        interval?: number | undefined;
        /** 執行過程，回傳 resolve 為成功， reject 為失敗進入下一次重試 */
        action: (_index: number) => Promise<T_1>;
    }) => Promise<T_1>;
    /**
     * 結合非同步與計數的迴圈操作。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#asyncwhile
     */
    asyncWhile: (cb: (_context: {
        count: number;
        doBreak: () => void;
    }) => Promise<any>) => Promise<void>;
    /**
     * 等待直到條件成立。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#waitfor
     */
    waitFor: <T_2>(params: {
        interval: number;
        handler: (_resolve: (_value: T_2) => void, _reject: (_error: any) => void) => Promise<void>;
    }) => Promise<T_2>;
};
