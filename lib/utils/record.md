# Record

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.ts)

優雅的 Object 操作。

```ts
import { record } from 'power-helper'
```

---

## Methods

### omit

淺拷貝同一份 Object，但忽略掉指定對象。

```ts
function<D extends object, T extends (keyof D)[]>(data: D, keys: T): Omit<D, T[0]>
```

#### example

```ts
const data = {
    name: 'dave',
    age: 18,
    year: 1993
}

console.log(record.omit(data, ['name']))
/*
    outputs: {
        age: 18,
        year: 1993
    }
*/
```

---

### setMapValue

複製指定物件的值到目標 Object 上，並產生一份新的 Object，細部規則可詳見 example。

```ts
type Options = {
    /** 如果 Object 內遇到 Object 則會深入復寫，可以透過指定路徑直接覆蓋値 */
    directReplacePeels?: string[]
}
function<T extends Record<string, any>>(template: T, data: Record<string, any>, optnios?: Options): T
```

#### example

```ts
const template = {
    name: 'dave',
    // data 沒有 age 屬性，會保留原本的值
    age: 18,
    parents: ['mother', 'father'],
    cars: {
        bike: {
            name: 'giant',
            boughtAt: '2022-01-01'
        },
        scooter: {
            name: 'gt',
            boughtAt: '2022-01-02'
        }
    }
}

const data = {
    // 共同有 name 的 key 值，所以複寫 template 的 name
    name: 'james',
    // template 沒有 sex，將忽略
    sex: 'M',
    // 如果對象是一組 Array 值會直接複寫
    parents: ['sister'],
    // 如果對象是一組 Object 則會深入復寫
    cars: {
        bike: {
            name: 'ubike'
        },
        // 可以透過 options.directReplacePeels 抉擇是否直接複寫
        scooter: {
            name: 'gt',
            price: 100
        }
    }
}

console.log(record.setMapValue(template, data, {
    directReplacePeels: [
        'cars.scooter'
    ]
}))
/*
    outputs: {
        name: 'james',
        age: 18,
        parents: ['sister'],
        cars: {
            bike: {
                name: 'ubike',
                boughtAt: '2022-01-01'
            },
            scooter: {
                name: 'gt',
                price: 100
            }
        }
    }
*/
```

---

### createStrictObject

建立一組嚴格檢查、轉譯並實質不能變動的 Object，通常應用在環境變數。

```ts
// 內容分別是： [型態, 必填, 值, 預設值]
type Params = [
    Number | String | Boolean,
    boolean,
    any,
    any?
]
function<T extends Record<string, Params>>(data: T): Record<keyof T, boolean | string | number>
```

#### example

```ts
// 如果執行階段中檢測到不符合格式會擲出錯誤。
const data = record.createStrictObject({
    isProd: [Boolean, true, 'true'],
    baseUrl: [String, true, process.env.baseUrl],
    port: [Number, true, '8080'],
    isLocal: [Boolean, false, null, false]
})
console.log(data)
/*
    outputs: {
        isProd: true,
        baseUrl: 'http://...',
        port: 8080,
        isLocal: false
    }
*/
```
