# Interaction

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/interaction.ts)

建立可監聽、追蹤、可搭配視圖化的訊息整合工具。

## 如何使用

```ts
import { Interaction, Exception } from 'power-helper'

const interaction = new Interaction({
    name: 'root',
    interceptorMessage: Exception.basicMessageParser
})

// 當被觸發的時候，要求介面反饋
interaction.on('action', ({ type, message }) => {
    if (type === 'notify') {
        alert(message)
    }
})

// 假設請求失敗要跳出錯誤訊息
let { notify } = interaction.checkout('update')
try {
    await axios.post('....')
} catch (error) {
    notify('danger', error)
}
```

### Constructor

```ts
class Interaction {
    constructor(params: {
        // 當前的追蹤名稱
        name: string
        // 儲存 step 的長度，預設 100
        stepMaxSize?: number
        // 可以自訂訊息的解析器
        interceptorMessage?: (_data: any) => string
    })
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 迭代每個階段訊息 */
function each(cb: (_step: Step, _index: number) => void): void
/** 增加一個階段訊息 */
function step(message: string, meta?: any): void
/** 發出錯誤的訊息，通常表示於整個應用程式發生錯誤 */
function wrong(message: string): void
/** 發出錯誤的訊息，並回傳一組錯誤，如果沒有傳入第二個參數則以 message 擲出 */
function fail(message: string, error?: any): Error
/** 發出通知的訊息 */
function notify(type: StepLevel, content: any): void
/** 獲取可見得流程文字 */
function getFlowText(): string
```

### Events

#### call

呼叫 `action` 時觸發。

```ts
const eventData: Step
```

### Types

```ts
type StepTypes = 'step' | 'wrong' | 'notify' | 'fail'
type StepLevel = 'info' | 'warning' | 'danger' | 'success'
type Step = {
    type: StepTypes
    meta?: any
    level: StepLevel
    message: string
    createdAt: number
    checkoutAt: string
}
```