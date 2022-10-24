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
