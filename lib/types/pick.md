# Pick

更精準的挑選出對象。

## 如何使用

```ts
import {
    /**
     * 在 Record 中獲取指定類型的參數
     * @example
     * const user = {
     *  name: 'dave',
     *  age: 18
     * }
     * const onlyAge: PickByTypeStrict<number, typeof user> = {
     *  age: 20
     * }
     */
    PickByTypeStrict
} from 'power-helper/types/pick'
```
