# QueryCollection

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/query-collection.ts)

可以蒐集資料並統一發出請求。

## 如何使用

```ts
import { QueryCollection } from 'power-helper'

type Params = {
    name: string
}

type Response = {
    name: string
    age: number
}

const getUsers = async(names: string[]) => {
    return names.map(e => {
        return {
            name: e,
            age: 18
        }
    })
}

/* 從第一個 push 請求發出時計時 100 毫秒，這段期間所有的 push 事件都會被蒐集起來至第一個參數  */
const queryCollection = new QueryCollection<Params, Response>({
    waitTime: 100,
    query: async(items) => {
        const names = items.map(e => e.name)
        const response = await getUsers(names)
        return response
    }
})

/* 以下兩個 push 會統一收到同一個 query 後的資料  */
const [users1, users2] = await Promise.all([
    queryCollection.push({ name: 'dave' }),
    queryCollection.push({ name: 'jasme' })
])

console.log(users1 === users2) // true
```

### 搭配 Cache 建立強大的存取模式

```ts
import { Cache, QueryCollection } from 'power-helper'

const collection = new QueryCollection({
    waitTime: 100,
    query: async(items) => {
        let names = items.map(e => e.name)
        let users = await fetchUsers(names)
        return users
    }
})

const usersCache = new Cache({
    ttl: 1000 * 60 * 5,
    key: ({ name }) => name,
    pick: async({ name }) => {
        let users = await collection.push({ name })
        return users.find(user => user.name === name)
    }
})

/* 這樣開發就可以統一發送，並分批儲存快取，下次再取就會獲取 cache */
const getUser = async(name: string) => {
    let user = await usersCache.get(name)
    return user
}
```

### Constructor

```ts
/**
 * @param {object} options
 * @param {number} options.waitTime - 發出請求前蒐集資料的時間，單位: 毫秒
 * @param {function} options.query 請求方法
 */
class QueryCollection<Params extends Record<string, any>, Response extends Record<string, any>> {
    constructor(options)
}
```

### Property

```ts
/** 推送一筆資料進搜集器 */
function push(params: Params): Response[]
```
