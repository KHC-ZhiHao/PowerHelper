# Element

優雅的 Dom 操作。

```ts
import { element } from 'power-helper'
```

---

## Methods

### importScript

透過執行階段注入 Javascript Tag，這個方法只允許在 Browser 中執行。

```ts
function(url: string): Promise<unknow>
```

#### example

```ts
element.importScript('https://code.jquery.com/jquery-3.6.1.min.js')
```

### createAndAppend

新增並將 Tag Append 至指定 Element，這個方法只允許在 Browser 中執行。

```ts
function<T extends keyof HTMLElementTagNameMap>(tag: T, cb: (el: HTMLElementTagNameMap[T]) => any, target?: HTMLElement): HTMLElementTagNameMap[T]
```

#### example

```ts
const flag = 0
const el = element.createAndAppend('div', el => {
    el.onclick = () => {
        flag += 10
    }
})
el.click()
console.log(flag)
/*
    outputs: 10
*/
```
