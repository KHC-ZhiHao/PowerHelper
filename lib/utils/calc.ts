
/**
 * 將指定時間格式的數值轉換成毫秒。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/calc.md#toms
 * @param unit y: years, d: days, h: hours, m: minutes, s: seconds
 */

export const toMs = (unit: 'y' | 'd' | 'h' | 'm' | 's', value: number) => {
    let output = 0
    if (unit === 's') {
        output = value * 1000
    }
    if (unit === 'm') {
        output = value * 60000
    }
    if (unit === 'h') {
        output = value * 3600000
    }
    if (unit === 'd') {
        output = value * 86400000
    }
    if (unit === 'y') {
        output = value * 31557600000
    }
    return Math.floor(output)
}
