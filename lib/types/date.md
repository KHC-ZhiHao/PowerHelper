# Date Type

時間格式相關的 Type。

## 如何使用

```ts
import {
    /**
     * 表達 YYYY 的格式
     * @example '2021'
     */
    YearFormat,
    /**
     * 表達 MM 的格式
     * @example '10'
     */
    MonthFormat,
    /**
     * 表達 DD 的格式
     * @example '20'
     */
    DateFormat,
    /**
     * 表達 HH 的格式
     * @example '11'
     */
    HourFormat,
    /**
     * 表達 mm 或是 ss 的格式
     * @example '11'
     */
    MsFormat,
    /**
     * 表達 YYYY-MM-DD 的格式
     * @desc 由於 TypeScript 不支援過於複雜的字串表達，該型態不一定準確
     * @example '2011-11-11'
     */
    YYYYMMDDFormat,
    /**
     * 表達 HH:mm:ss 的格式
     * @example '11:11:11'
     */
    HHMMSSFormat,
    /**
     * 標準的 Ios Date String
     * @desc 由於 TypeScript 不支援過於複雜的字串表達，該型態不一定準確
     * @example '2011-11-11T00:00:00' | '2011-11-11T00:00:00Z' | '2011-11-11T00:00:00+08:00'
     */
    IosDateFormat
} from 'power-helper/types/date'
```
