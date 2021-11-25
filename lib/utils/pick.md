# Pick

精準地進行物件選取。

## 如何使用

```ts
import { pick } from 'power-helper'
/** data 如果是 null，則回傳預設值 */
pick.ifEmpty = function(data: any, def: any): any;

/** 比 typeof 回傳更精準的類型 */
pick.getType = function(data: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "empty" | "array" | "NaN" | "regexp" | "promise" | "buffer" | "error";

/**獲取指定路徑的值 */
pick.peel = function(data: any, path: string): any | null

let data = {
    a: {
        b: 3
    }
}

console.log(pick.peel(data, 'a.b')) // 3
```
