# Record

物件相關處理。

## 如何使用

```ts
import { TRecord } from 'power-helper'

/**
 * 深入唯獨物件的所有屬性
 */

const val: TRecord.DeepReadonly<{ a: { b: 1 } }> = ...

/**
 * 當兩個物件混合的時候，由後者的型態取代前者，而非傳統的 & 會使兩者不同的屬性相疊。
 */

const val: TRecord.Assign<{ name: number }, { name: string }> = object.assign({ name: 1 }, { name: '1' })
```
