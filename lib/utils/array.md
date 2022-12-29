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

---

### unique

移除 Array 中相同的元素。

```ts
function <T extends Array<any>>(items: T): T
```

#### example

```ts
const items = [1, 2, 3, 4, 4]
const result = array.unique(items)
console.log(result)
/*
    outputs: [1, 2, 3, 4]
*/
```

---

### asyncMap

允許非同步進行的 map。

```ts
function <T, R>(items: T[], cb: (item: T) => Promise<R>): Promise<R[]>
```

#### example

```ts
const result = await array.asyncMap([1, 2, 3, 4], async e => {
    return e + 1
})
console.log(result)
/*
    outputs: [2, 3, 4, 5]
*/
```
