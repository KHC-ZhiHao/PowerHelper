# Json

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.ts)

優雅的 JSON 格式相關處理。

```ts
import { json } from 'power-helper'
```

---

## Methods

### jpjs

經典的深拷貝方案 JSON.parse(JSON.stringify(data))。

```ts
function<T>(data: T): T
```

#### example

```ts
const oldData = { name: 1 }
const newData = json.jpjs(oldData)
console.log(oldData === newData)
/*
    outputs: false
*/
```

---

### nonStrictJSONParse

執行 JSON Parse，如果失敗回傳空白物件 `{}`。

```ts
function(data: string): any
```

#### example

```ts
const result = json.nonStrictJSONParse(`{123}`)
console.log(result)
/*
    outputs: {}
*/
```

---

### nonStrictJSONStringify

執行 JSON Stringify，如果失敗回傳字串 `'{}'`。

```ts
function(data: any): string
```

#### example

```ts
const user = {}
user.self = user
const result = json.nonStrictJSONStringify(user)
console.log(result)
/*
    outputs: '{}'
*/
```
