# Calc

負責計算的單元。

```ts
import { calc } from 'power-helper'
```

---

## Methods

### toMs

將指定時間格式的數值轉換成毫秒。

```ts
function(unit: 'y' | 'w' | 'd' | 'h' | 'm' | 's', value: number): number
```

#### example

```ts
const ms = calc.toMs('d', 2)
console.log(ms)
/*
    outputs: 172800000
*/
```
