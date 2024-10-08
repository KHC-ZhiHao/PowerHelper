# Element

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.ts)

優雅的 Dom 操作。

```ts
import { element } from 'power-helper'
```

---

## Methods

### importScript

透過執行階段注入 Script Tag，這個方法只允許在 Browser 中執行。

```ts
function(url: string, options?: {
    appendBefore?: (el: HTMLLinkElement) => void
}): Promise<unknow>
```

#### example

```ts
element.importScript('https://code.jquery.com/jquery-3.6.1.min.js')
```

### importCss

透過執行階段注入帶 Stylesheet 的 Link Tag，這個方法只允許在 Browser 中執行。

```ts
function(href: string, options?: {
    appendBefore?: (el: HTMLLinkElement) => void
}): Promise<unknow>
```

#### example

```ts
element.importCss('https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css', {
    appendBefore(el) {
        el.integrity = 'sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65'
        el.crossorigin = 'anonymous'
    }
})
```

### createAndAppend

建立一個 Element 並 Append 至 Body 或指定位置，這個方法只允許在 Browser 中執行。

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
