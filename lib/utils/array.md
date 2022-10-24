# Array

優雅的 Array 操作。

```ts
import { array } from 'power-helper'
```

---

## Methods

### groups

將 Array 依照指定數量集成一組。

```ts
function<T>(size: number, items: T[]): T[][]
```

#### example

```ts
const oldArray = [1, 2, 3, 4, 5, 6]
const newArray = array.groups(3, oldArray)
console.log(newArray)
/*
    outputs: [
        [1,2,3],
        [4,5,6]
    ]
*/
```

---

### randomPick

從 Array 中隨機獲取一個值。

```ts
function <T>(items: T[]): T
```

#### example

```ts
const items = [1, 2, 3]
const item = array.randomPick(items)
console.log(item)
/*
    outputs: 1 | 2 | 3
*/
```

---

### randomPicks

從 Array 中隨機獲取指定數量且不重複的值，如果指定數量大於 Array 長度時會傳整組 Array。

```ts
function <T>(take: number, items: T[]): T[]
```

#### example

```ts
const items = [1, 2, 3]
const item = array.randomPicks(2, items)
console.log(item)
/*
    outputs: [1, 2] | [2, 3] | [1, 3] ...
*/
```
