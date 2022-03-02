# Style String

方便組合出 HTML Element Style 的工具。

## 如何使用

```ts
import { StyleString } from 'power-helper'
const ss = new StyleString()
ss.set('textAlign', 'center')
ss.set('fontSize', '3px')
console.log(ss.join()) // text-align:center;font-size:3px
```

### Constructor

```ts
class StyleString {
    constructor()
}
```

### Property

```ts
/** 寫入 key */
function set(key: StyleKeys, value?: string, defaultValue?: string): void

/** 獲取指定 key 的值 */
function get(key: StyleKeys): string

/** 刪除指定的 key */
function remove(key: StyleKeys): void

/** 從對象面附値 */
function assign(element: HTMLElement): void

/** 獲得 style string */
function join(separator = ';'): string
```
