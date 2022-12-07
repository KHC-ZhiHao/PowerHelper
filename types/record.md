# Record

物件相關處理。

## 如何使用

```ts
import {
    /**
     * 深入唯獨物件的所有屬性
     * @example
     * const text: Readonly<{ a: { b: 1 } }> = ...
     */
    DeepReadonly
    /**
     * 當兩個物件混合的時候，由後者的型態取代前者，而非傳統的 & 會使兩者不同的屬性相疊。
     * @example
     * const data: Assign<{ name: number }, { name: string }> = object.assign({ name: 1 }, { name: '1' })
     */
    Assign
} from 'power-helper/types/record'
```
