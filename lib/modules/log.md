# Log

一種更高階打印出 Log 的模組，不只是你可以控制他是否要在指定環境中顯示，甚至可以建立監聽打印事件。

## 如何使用

```ts
import { Log } from 'power-helper'
let log = new Log('my-log')
log.print('hello')
```

### Constructor

```ts
/**
 * @param {string} name
 * @param {object} [options]
 * @param {boolean} [options.silence = false] - 是否預設為 silence 狀態
 * @param {LogType} [options.defaultLogType  = 'normal'] - 如果不指定 LogType 則預設此設定值
 */
class Log {
    constructor(name, options)
}
```

### Property

Extends: [Event](./event.md)

```ts
/** 可以繼續呼叫 print 但不會打印 log。 */
function silence(active: boolean = true): void

/** 打印 log。 */
function print(message: any, options?: {
    color?: Color
    importantLevel?: 0 | 1 | 2 | 3
}): string
```

### Types

```ts
type Color = 'default' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'cyan' | 'white'
type LogType = 'normal' | 'dev' | 'super-error' | 'error' | 'warning' | 'fixme' | 'todo'
```

### Event

#### print

呼叫 `print` 時觸發。

```ts
const eventData: {
    time: string
    name: string
    data: any
    step: number
    color: Color
    message: string
    logType: LogType
}
```
