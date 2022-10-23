# Array

針對 Array 的操作。

## Methods

### Groups

將 Array 依照指定數量集成一組。

```ts
array.groups = function<T>(size: number, data: T[]): T[][]
```

#### example

```ts
import { array } from 'power-helper'
const oldArray = [1,2,3,4,5,6]
const newArray = groups(3, oldArray)
console.log(newArray)
```

outputs:

```ts
[[1,2,3],[4,5,6]]
```
