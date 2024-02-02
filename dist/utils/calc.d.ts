/**
 * 負責計算的單元。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/calc.md
 */
export declare const calc: {
    /**
     * 將指定時間格式的數值轉換成毫秒。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/calc.md#toms
     * @param unit y: years, d: days, h: hours, m: minutes, s: seconds
     */
    toMs: (unit: 'y' | 'd' | 'h' | 'm' | 's', value: number) => number;
};
