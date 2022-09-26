# Record

進行高等的物件操作。

## 如何使用

```ts
import { record } from 'power-helper'

/** 複製指定物件的值到目標物件上，並產生一份新的物件 */

record.setMapValue = function(template: Record<string, any>, data: Record<string, any>, optnios?: {
    // 如果是物件則會深入復寫，可以透過物件路徑直接覆蓋値
    directReplacePeels?: string[]
}): any;

const template = {
    name: 'dave',
    age: 18 // data 沒有 age，採用原本的值
}

const data = {
    name: 'james', // 共同有 name 的 key 值，所以複寫 template 的 name
    sex: 'M' // template 沒有 sex，忽略
}

console.log(record.setMapValue(template, data)) // { name: 'james', age: 18 }

/** 建立一組嚴格檢查、轉譯並實質不能變動的物件，通常應用在環境變數，防止出現定義問題。 */
/** 內容分別是： [型態, 必填, 值, 預設值] */

record.createStrictObject = function(data: Record<string, [Number | String | Boolean, boolean, any, any?]>)

const env = record.createStrictObject({
    isProd: [Boolean, true, 'true'],
    baseUrl: [String, true, process.env.baseUrl],
    port: [Number, true, '8080'],
    isLocal: [Boolean, false, null, false]
})

console.log(env.port) // 8080
```
