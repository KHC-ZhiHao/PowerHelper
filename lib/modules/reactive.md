# Reactive

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/reactive.ts)

透過輪詢的方法監聽物件有沒有發生變動。

## 如何使用

```ts
import { Reactive } from 'power-helper'

type State = {
    name: string
}

const nowName = 'dave'
const state: State = {
    name: 'dave'
}
const reactive = new Reactive<State>({
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
class Reactive<State> {
    constructor(params: {
        /** 每次輪詢時間(毫秒)，預設 100 ms */
        schedule?: number,
        /** 透過長輪詢回傳指定的 key */
        observable: (state: State) => Promise<string>,
        /** 如果 observable 回傳的 key 有改動則觸發 */
        action: (context: {
            state: State
            newKey: string
            oldKey: string | null
        }) => Promise<any>
    })
}
```

### Property

```ts
/** 關閉監聽 */
function close(): void
/** 在下一次輪詢時觸發 */
function nextTick(cb: (state: State) => void): void
/** 指定監聽對象 */
function from(state: State): Promise<Reactive>
/** 是否觸發過 from */
function isActive(): boolean
```
