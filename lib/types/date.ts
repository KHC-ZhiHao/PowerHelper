type Unit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type DayUnit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * 表達 YYYY 的格式
 * @example '2021'
 */

export type YearFormat = Exclude<`${Unit}${Unit}${Unit}${Unit}`, '0000'>

/**
 * 表達 MM 的格式
 * @example '10'
 */

export type MonthFormat = `0${DayUnit}` | `${'10' | '11' | '12'}`

/**
 * 表達 DD 的格式
 * @example '20'
 */

export type DateFormat = `0${DayUnit}` | `1${Unit}` | `2${Unit}` | `${'30' | '31'}`

/**
 * 表達 HH 的格式
 * @example '11'
 */

export type HourFormat = `0${Unit}` | `1${Unit}` | `${'20' | '21' | '22' | '23'}`

/**
 * 表達 mm 或是 ss 的格式
 * @example '11'
 */

export type MsFormat = `0${Unit}` | `1${Unit}` | `2${Unit}` | `3${Unit}` | `4${Unit}` | `5${Unit}`

/**
 * 表達 HH:mm:ss 的格式
 * @example '11:11:11'
 */

export type HHMMSSFormat = `${HourFormat}:${MsFormat}:${MsFormat}`

/**
 * 表達 YYYY-MM-DD 的格式
 * @desc 由於 TypeScript 不支援過於複雜的字串表達，該型態不一定準確
 * @example '2011-11-11'
 */

export type YYYYMMDDFormat = `${number}-${MonthFormat}-${DateFormat}`

/**
 * 標準的 Ios Date String
 * @desc 由於 TypeScript 不支援過於複雜的字串表達，該型態不一定準確
 * @example '2011-11-11T00:00:00' | '2011-11-11T00:00:00Z' | '2011-11-11T00:00:00+08:00'
 */

export type IosDateFormat = `${YYYYMMDDFormat}T${HourFormat}:${number}:${number}${string}`
