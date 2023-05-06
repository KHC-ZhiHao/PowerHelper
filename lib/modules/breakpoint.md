# Breakpoint

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/breakpoint.ts)

斷點驗證工具。

## 如何使用

```ts
import { Breakpoint } from 'power-helper'

const breakpoint = new Breakpoint({
    defCheckValue: () => window.innerWidth,
    points: Breakpoint.bootstrapBreakpoints
})

// output: boolean
console.log(breakpoint.in('lg-and-down'))
```

### Constructor

```ts
/**
 * @param {() => number} params.defCheckValue 如果參數不給予寬，則反為預設值
 * @param {BreakpointsRecord} params.points 斷點資訊，可以使用靜態屬性賦予的參數
 */
class Breakpoint {
    constructor(params: {
        defCheckValue: () => number,
        points: BreakpointsRecord
    })
}
```

### Static

```ts
/** 基於 bootstrap 5 的斷點響應設定。 */
const bootstrapBreakpoints: BreakpointsRecord

/** 基於 vuetify 2 的斷點響應設定。 */
const vuetifyBreakpoints: BreakpointsRecord
```

### Property

```ts
/** 獲取符合斷點條件的列表 */
function matchs(width?: number): BreakpointsRange[]

/**  獲取寬度的斷點 */
function is(width?: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/** 獲取目標。 */
function in(match: BreakpointsRange, width?: number): boolean
```

### Types

```ts
type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type BreakpointsRange = `${Breakpoints}-${'only' | 'and-up' | 'and-down'}`

type BreakpointsRecord = Record<Breakpoints, {
    min: number
    max: number
}>
```
