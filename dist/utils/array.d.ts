/**
 * 將 Array 依照指定數量集成一組。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#groups
 */
export declare const groups: <T>(size: number, items: T[]) => T[][];
/**
 * 從 Array 中隨機獲取一個值。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompick
 */
export declare const randomPick: <T>(items: T[]) => T;
/**
 * 從 Array 中隨機獲取指定數量且不重複的值，如果指定數量大於 Array 長度時會傳整組 Array。
 * @param take 指定獲取數量。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompicks
 */
export declare const randomPicks: <T>(take: number, items: T[]) => T[];
/**
 * 移除 Array 中相同的元素。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#unique
 */
export declare const unique: <T extends any[]>(items: T) => T;
/**
 * 允許非同步進行的 map。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#asyncmap
 */
export declare const asyncMap: <T, R>(items: T[], cb: (_item: T) => Promise<R>) => Promise<R[]>;
