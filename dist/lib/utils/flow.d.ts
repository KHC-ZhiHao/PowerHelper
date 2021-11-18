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
