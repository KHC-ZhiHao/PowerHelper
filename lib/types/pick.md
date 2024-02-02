# Pick

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/lib/types/pick.ts)

更精準的挑選出對象。

## 如何使用

```ts
type TPick = {
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
    PromiseResponseType,
    /**
     * 回傳物件鏈
     * @example
     * const foo = {
     *  a: {
     *      b: '123'
     *  }
     * }
     * const bar: ObjectPath<typeof foo> = 'a.b'
     */
    ObjectPath,

    /**
     * 深度解析鏈上的型態
     * @example
     * const foo = {
     *  a: {
     *      b: '123'
     *  }
     * }
     * const bar: PeelType<'a.b', typeof foo> = '123'
     */
    PeelType
}
```
