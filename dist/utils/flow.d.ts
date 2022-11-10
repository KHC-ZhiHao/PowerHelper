/**
 * 直接運行方法並返回結果。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#run
 */
export declare const run: <T extends () => any>(cb: T) => ReturnType<T>;
/**
 * 停止執行指定時間(毫秒)。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#sleep
 */
export declare const sleep: (ms: number) => Promise<unknown>;
/**
 * 求整數範圍內的隨機值。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#randomint
 */
export declare const randomInt: (min: number, max: number) => number;
/**
 * 建立一組隨機的 v4 uuid。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createuuid
 */
export declare const createUuid: () => string;
/**
 * 優雅的設計有限的重複執行直到成功為止。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#retry
 */
export declare const retry: <T>(params: {
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
    action: (_index: number) => Promise<T>;
}) => Promise<T>;
/**
 * 結合非同步與計數的迴圈操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#asyncwhile
 */
export declare const asyncWhile: (cb: (_context: {
    count: number;
    doBreak: () => void;
}) => Promise<any>) => Promise<void>;
