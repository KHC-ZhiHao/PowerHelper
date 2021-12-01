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
    PickByTypeStrict,
    /**
     * 獲取 Promise 的回傳值
     * @example
     * const foo = async() => {
     *  return 3
     * }
     * const bar: PromiseResponseType<typeof foo> = 3
     */
    PromiseResponseType
} from 'power-helper/types/pick'
```
