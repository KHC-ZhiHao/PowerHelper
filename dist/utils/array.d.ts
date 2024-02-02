/**
 * 優雅的 Array 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md
 */
export declare const array: {
    /**
     * 將 Array 依照指定數量集成一組。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#groups
     */
    groups: <T>(size: number, items: T[]) => T[][];
    /**
     * 從 Array 中隨機獲取一個值。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompick
     */
    randomPick: <T_1>(items: T_1[]) => T_1;
    /**
     * 從 Array 中隨機獲取指定數量且不重複的值，如果指定數量大於 Array 長度時會傳整組 Array。
     * @param take 指定獲取數量。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompicks
     */
    randomPicks: <T_2>(take: number, items: T_2[]) => T_2[];
    /**
     * 移除 Array 中相同的元素。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#unique
     */
    unique: <T_3 extends any[]>(items: T_3) => T_3;
    /**
     * 允許非同步進行的 map。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#asyncmap
     */
    asyncMap: <T_4, R>(items: T_4[], cb: (_item: T_4) => Promise<R>) => Promise<R[]>;
    /**
     * 如果 Array 沒有指定的值，加入該值，如果有則移除。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#check
     */
    check: <T_5>(items: T_5[], value: T_5) => T_5[];
};
