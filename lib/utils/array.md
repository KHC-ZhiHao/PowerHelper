# Array

針對陣列的結果

## 如何使用

```ts
import { array } from 'power-helper'
/**
 * 將陣列依照數量集成一組
 * @example
 * const myArray = [1,2,3,4,5,6]
 * const newArray = groups(3, myArray)
 * console.log(arrayGroups) // [[1,2,3],[4,5,6]]
 */
array.arrayGroups = function(size: number, data: any[]): any[][]
```
