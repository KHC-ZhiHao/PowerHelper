# Reactive

透過輪詢的方法監聽物件有沒有發生變動，有就觸發 action。

## 如何使用

```ts
import { Reactive } from 'power-helper'
const nowName = 'dave'
const state = {
    name: 'dave'
}
const reactive = new Reactive({
    // 透過長輪詢回傳指定的 key
    observable: async(state) => {
        return state.name
    },
    // 如果 observable 回傳的 key 有改動則觸發
    action: async({ state }) => {
        nowName = state.name
    }
})
// 指定要監聽的物件
await reactive.from(state)
state.name = 'jame'
setTimeout(() => {
    // 由於姓名發生改變，所以 nowName 被異動
    console.log(nowName) // james
}, 150)
```

### Constructor

```ts
class Reactive {
    constructor(params: {
        // 透過長輪詢回傳指定的 key
        observable: async(state) => {
            return state.name
        },
        // 如果 observable 回傳的 key 有改動則觸發
        action: async({ state }) => {
            nowName = state.name
        }
    })
}
```

### Property

```ts
/** 加入一個程序，不能重複已存在的命名 */
function add(name: string, intervalMs: number, callback: () => Promise<any>): void
```
