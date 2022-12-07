# Pick

精準地提取目標相關資源。

```ts
import { pick } from 'power-helper'
```

---

## Methods

### ifBad

值如果是 null | undefined | Error | NaN，則回傳預設值。

```ts
function<T>(data: T | null | undefined | Error, def: T): T
```

### ifEmpty

值如果是 null | undefined，則回傳預設值。

```ts
function<T>(data: T | null | undefined, def: T): T
```

#### example

```ts
const result = pick.ifEmpty(null, '123')
/*
    outputs: '1234'
*/
```

---

### getType

比 typeof 回傳更精準的類型。

```ts
function(data: any): 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'object' | 'function' | 'empty' | 'array' | 'NaN' | 'regexp' | 'promise' | 'buffer' | 'error'
```

#### example

```ts
const result = pick.getType(new Promise(resolve => resolve()))
/*
    outputs: 'promise'
*/
```

---

### peel

獲取指定路徑的值，如果值不存在回傳 `null`。

```ts
function(target: Record<string, any>, path: string): any | null
```

#### example

```ts
let data = {
    a: {
        b: 3
    }
}
console.log(pick.peel(data, 'a.b'))
/*
    outputs: 3
*/
```

---

### vars

獲取文字裡面的變數列表。

```ts
function(params: {
    start: string
    end: string
    text: string
}): string[]
```

#### example

```ts
const result = pick.vars({
    start: '{',
    end: '}',
    text: '你好我是 {name}，目前的工作是 {job}。'
})
console.log(result)
/*
    outputs: [
        'name',
        'job'
    ]
*/
```
