# AsyncLocalStorage

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/async-local-storage.ts)

非同步的操作 LocalStorage，有助於擴展更多應用模式。

## 如何使用

```ts
import { AsyncLocalStorage } from 'power-helper'

type Columns = {
    token: string
}
const state = {}

// 在 AsyncLocalStorage 需要一個 storageSystem 參數，這個參數必須實作 keys、setItem、getItem、removeItem 四個方法
const system = {
    keys: async() => Object.keys(state),
    setItem: async(key: string, value: any) => state[key] = value,
    getItem: async(key: string) => state[key],
    removeItem: async(key: string) => {
        delete state[key]
    }
}

const asyncLocalStorage = new AsyncLocalStorage<Columns>('my-storage', {
    storageSystem: system
})
await asyncLocalStorage.set('token', '12345')
const data = await asyncLocalStorage.get('token')
console.log(data) // 12345
```

### 將瀏覽器 LocalStorage 轉換成非同步系統

```ts
import { AsyncLocalStorage } from 'power-helper'
const asyncLocalStorage = new AsyncLocalStorage<any>('my-storage', {
    storageSystem: AsyncLocalStorage.storageToAsyncStorage(localStorage)
})
```

### 允許儲存物件型態

```ts
import { AsyncLocalStorage } from 'power-helper'

type Columns = {
    user: {
        name: string
    }
}

const asyncLocalStorage = new AsyncLocalStorage<Columns>('my-storage', { ... })
await asyncLocalStorage.set('user', {
    name: 'dave'
})
const data = await asyncLocalStorage.get('user')
console.log(data.name) // dave
```

### 攔截行為

你可以透過 intercept 參數攔截 get、set 的行為，這些行為也全是非同步的，例如把你的資料印上過期日，並在獲取時篩選過期的資料。

```ts
import { AsyncLocalStorage } from 'power-helper'
const asyncLocalStorage = new AsyncLocalStorage('my-storage', {
    storageSystem: { ... },
    intercept: {
        async get(name, data) {
            if (Date.now() > data.exp) {
                localStorage.remove(name)
                return null
            }
            // 仍然只返回應該返回的資料
            return data.data
        },
        async set(name, data) {
            // 攔截要儲存的資料，並修改成 { data ,exp }
            return {
                data,
                exp: Date.now() + 100
            }
        }
    }
})
```

### 使用 callback 寫入值

```ts
import { AsyncLocalStorage } from 'power-helper'

type Columns = {
    names: string[]
}

let asyncLocalStorage = new AsyncLocalStorage<Columns>('my-storage', {
    storageSystem: { ... },
    defaultColumns: {
        names: async() => []
    }
})
// 如果使用傳統方式要 push 一組資料需要透過以下方法
await asyncLocalStorage.set('names', await asyncLocalStorage.get('names').push('dave'))
// 如果第二個參數是一組 function 則寫入回傳值
await asyncLocalStorage.set('names', async (names) => [...names, 'dave'])
```

### Constructor

```ts
/**
 * @param {string} namespaces 命名空間，防止與其他服務起衝突
 * @param {object} options
 * @param {Storage} options.storageSystem 指定運行的環境
 * @param {Record<string, () => Promise<any>>} [options.defaultColumns] - 假如該欄位尚未寫入時給予預設值
 * @param {(name: string, data: any, context: InterceptGet) => Promise<any>} [options.intercept.get] - 攔截資料獲取
 * @param {(name: string, data: any) => Promise<any>} [options.intercept.set] - 攔截資料設定
 */
class AsyncLocalStorage<Columns extends Record<string, any>> {
    constructor(namespaces, options)
}
```

### Property

```ts
/** 獲取指定名稱的資料 */
function get(name: string): Promise<any>

/** 設定指定名稱的資料 */
function set(name: string, data: any | (value: any) => any): Promise<any>

/** 刪除指定名稱的資料 */
function remove(name: string): Promise<void>

/** 刪除整個 namespaces 的資料 */
function clear(): Promise<void>

/** 獲得名稱完整的鍵值 */
function toKey(): string
```

## Types

```ts
type InterceptGet = {
    // 是否是採用預設值
    isDefault: boolean
    // 獲取預設值
    defaultValue: () => Promise<any>
    /** Storage */
    storage: AsyncLocalStorage<any>
}
