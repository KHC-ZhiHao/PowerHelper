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

## 監聽多個對象

你可以一口氣監聽多個 element。

```ts
import { ElementListenerGroup } from 'power-helper'

const elg = new ElementListenerGroup()

elg.observe(document.body)
elg.add('click', event => {
    console.log('hi')
})

const el = document.getElementById('xxx')
elg.observe(el)
el.click()
/*
    outputs: hi
*/
```

### Constructor

```ts
/**
 * @param {[Element]} element 需要監聽的 DOM
 */
class ElementListenerGroup {
    constructor(element?)
}
```

### Property

```ts
/** 加入一個新的監聽對象 */
function observe(element: Element): void

/** 移除指定 ID 的監聽 */
function off(listenerId: string): void

/** 加入一個監聽的項目 */
function add(channel: string, callback: (event: Event) => void, options: any): Listener

/** 清空現在監聽的項目 */
function clear(): void
```

## Types

```ts
type Listener<T> = {
    /** 提供刪除用的 id */
    id: string
    /** 關閉這個 Listener */
    off(): void
}
```
