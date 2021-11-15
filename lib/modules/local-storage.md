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

### 允許儲存物件型態

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

### 攔截行為

你可以透過 intercept 參數攔截 get、set 的行為，例如把你的資料印上過期日，並在獲取時篩選過期的資料。

```ts
import { LocalStorage } from 'power-helper'
let localStorage = new LocalStorage('my-storage', {
    intercept: {
        get(name, data) {
            if (Date.now() > data.exp) {
                localStorage.remove(name)
                return null
            }
            // 仍然只返回應該返回的資料
            return data.data
        },
        set(name, data) {
            // 攔截要儲存的資料，並修改成 { data ,exp }
            return {
                data,
                exp: Date.now() + 100
            }
        }
    }
})
```

### Constructor

```ts
/**
 * @param {string} namespaces 命名空間，防止與其他服務起衝突
 * @param {object} [options]
 * @param {Storage} [options.storageSystem = window.localStorage] 指定運行的 LocalStorage 環境，假如你想應用在 NodeJs 上必須設定此參數
 * @param {Record<string, any>} [options.dafaultColumns] - 假如該欄位尚未寫入時給予預設值
 * @param {(name: string, data: any) => any} [options.intercept.get] - 攔截資料獲取
 * @param {(name: string, data: any) => any} [options.intercept.set] - 攔截資料設定
 */
class LocalStorage<Columns extends Record<string, any> {
    constructor(namespaces, options)
}
```

### Property

```ts
/** 獲取指定名稱的資料 */
function get(name: string): any

/** 設定指定名稱的資料 */
function set(name: string, data: any): any

/** 刪除指定名稱的資料 */
function remove(name: string): void

/** 刪除整個 namespaces 的資料 */
function clear(): void
```
