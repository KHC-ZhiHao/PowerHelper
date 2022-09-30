import { PromiseResponseType } from '../types/pick';
/**
 * 停止執行指定時間(毫秒)
 */
export declare const sleep: (ms: number) => Promise<unknown>;
/**
 * 隨機獲取陣列內的一個值
 */
export declare const randomPick: <T extends unknown>(items: T[]) => T;
/**
 * 求整數範圍內的隨機值
 */
export declare const randomInt: (min: number, max: number) => number;
/**
 * 建立一組隨機的 v4 uuid
 */
export declare const createUuid: () => string;
/**
 * 反覆執行直到成功為止
 */
export declare const retry: <T extends (index: number) => Promise<any>>(params: {
    /**
     * 要重試幾次
     * @default 1
     */
    max?: number | undefined;
    /** 錯誤時呼叫此事件 */
    onFail?: ((index: number, error: any) => void) | undefined;
    /**
     * 每次錯誤重試間格的等待時間(毫秒)
     * @default 0
     */
    interval?: number | undefined;
    /** 總執行過程，回傳 resolve 為成功， reject 為失敗進入下一次重試 */
    action: T;
}) => Promise<PromiseResponseType<T, Parameters<ReturnType<T>["then"]>[0]>>;
/** 非同步迴圈 */
export declare const asyncWhile: (cb: (context: {
    count: number;
    doBreak: () => void;
}) => Promise<any>) => Promise<void>;
