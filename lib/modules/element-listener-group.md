# Element Listener Group

將 element 的 addEventListener 昇華到更好操作的階段。

## 如何使用

只要像 addEventListener 一樣操作就可以了。

```ts
import { ElementListenerGroup } from 'power-helper'

const elg = new ElementListenerGroup(document.body)
const listener = elg.add('click', event => {
    // do something...
})
elg.clear()
```

### Constructor

```ts
/**
 * @param {Element} element 需要監聽的 DOM
 */
class ElementListenerGroup {
    constructor(element)
}
```

### Property

```ts
/** 加入一個監聽的項目 */
function add(channel: string, callback: (event: Event) => void): Listener

/** 清空現在監聽的項目，不包含已 lock 的對象 */
function clear(): void
```

## Types

```ts
type Listener<T> = {
    /** 鎖定這個 Listener，促使不被刪除 */
    lock(active: boolean = true): void
    /** 關閉這個 Listener */
    off(): void
}
```
