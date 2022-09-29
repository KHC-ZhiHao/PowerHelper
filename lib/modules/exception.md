# Exception

高階的錯誤訊息處理工具。

## 如何使用

```ts
import { Exception } from 'power-helper'
const exception = new Exception('Power-Helper')
const error = exception.create('Fail!')

// output: Power-Helper: Fail!
console.log(error.message)
```

## 高階操作

可以透過 `basicMessageParser` 獲取最基本的解析模式。

```ts
const exception = new Exception('Power-Helper', {
    parseMessage: Exception.basicMessageParser,
    defaultError: () => '不明的錯誤'
})

// basicMessageParser 標配了解讀 axios 錯誤的能力

try {
    await axios.get('...')
} catch (error) {
    throw exception.create(error)
}
```

### Constructor

```ts
class Exception {
    constructor(serviceName: string, options?: Partial<{
        // 解析錯誤方法
        parseMessage: (error: any) => string | null,
        // 如果訊息解析回傳 null，會顯示返回的值
        defaultError: () => '不明的錯誤'
    }>)
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 切出一個 exception，有利於上下文追蹤 */
function checkout(childName: string): void

/** 建立一個 Error */
function create(message: any): Error

/** 解析錯誤訊息 */
function parseMessage(message: any): string
```