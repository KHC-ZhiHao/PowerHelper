# LocalStorage

協助你在複雜的網頁應用程式中更安全的操作 LocalStorage。

## 如何使用

```ts
import { LocalStorage } from 'power-helper'

type Columns = {
    token: string
}

let localStorage = new LocalStorage<Columns>('my-storage')
localStorage.set('token', '12345')
let data = localStorage.get('token')
console.log(data) // 12345
```

### 儲存物件

```ts
import { LocalStorage } from 'power-helper'

type Columns = {
    user: {
        name: string
    }
}

let localStorage = new LocalStorage<Columns>('my-storage')
localStorage.set('user', {
    name: 'dave'
})
let data = localStorage.get('user')
console.log(data.name) // dave
```

### Constructor

```ts
class LocalStorage<Columns extends Record<string, any> {
    constructor(namespaces, options)
}
```

### Property

```ts
```
