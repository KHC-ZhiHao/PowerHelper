# Date Type

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/lib/types/date.ts)

時間格式相關的 Type。

## 如何使用

```ts
import { TDate } from 'power-helper'
/**
 * 表達 YYYY 的格式
 */

const year: TDate.YearFormat = '2021'

/**
 * 表達 MM 的格式
 */

const month: TDate.MonthFormat = '12'

/**
 * 表達 DD 的格式
 */

const date: TDate.DateFormat = '31'

/**
 * 表達 HH 的格式
 */

const hour: TDate.HourFormat = '11'

/**
 * 表達 mm 或是 ss 的格式
 */

const ms: TDate.MsFormat = '11'

/**
 * 表達 YYYY-MM-DD 的格式
 */

const yyyymmdd: TDate.YYYYMMDDFormat = '2011-11-11'

/**
 * 表達 HH:mm:ss 的格式
 */

const hhmmss: TDate.HHMMSSFormat = '11:11:11'

/**
 * 標準的 Ios Date String
 */

const iosDate: TDate.IosDateFormat = '2011-11-11T00:00:00' | '2011-11-11T00:00:00Z' | '2011-11-11T00:00:00+08:00'
```
