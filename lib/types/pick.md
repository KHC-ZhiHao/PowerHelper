# Pick

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/lib/types/pick.ts)

更精準的挑選出對象。

## 如何使用

```ts
import { TPick } from 'power-helper'

 /**
 * 在 Record 中獲取指定類型的參數
 */

const user = {
    name: 'dave',
    age: 18
}
const onlyAge: TPick.PickByTypeStrict<number, typeof user> = {
    age: 20
}

/**
 * 獲取 Promise 的回傳值
 */

const foo = async() => {
    return 3
}
const bar: TPick.PromiseResponseType<typeof foo> = 3

/**
 * 獲取 Promise 成功的值
 */

const foo = Promise.resolve(3)
const bar: TPick.PromiseType<typeof foo> = 3

/**
 * 回傳物件鏈
 */

const foo = {
    a: {
        b: '123'
    }
}
const bar: TPick.ObjectPath<typeof foo> = 'a.b'

/**
 * 深度解析鏈上的型態
 */

const foo = {
    a: {
        b: '123'
    }
}
const bar: TPick.PeelType<'a.b', typeof foo> = '123'
```
