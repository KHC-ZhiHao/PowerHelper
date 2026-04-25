# Once

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/once.ts)

只會執行一次的非同步事件。

## 如何使用

```ts
import { Once } from 'power-helper'
let flag = 0
let once = new Once({
    handler: async() => {
        flag += 1
    }
})

await once.run()
// 第二次執行的時候會直接回傳第一次執行的結果
await once.run()

console.log(flag)
/*
    outputs: 1
*/
```

### Constructor

```ts
/**
 * @param {object} params
 * @param {() => Promise<any>} parmas.handler - 執行事件
 */
class Once {
    constructor(params: {
        handler: () => Promise<any>
    })
}
```

### Property

```ts
/** 執行程式 */
function run(): Promise<any>

/** 重置狀態 */
function reset(): void
```
