# Record

進行高等的物件操作。

## 如何使用

```ts
import { record } from 'power-helper'
/** 複製指定物件的值到目標物件上，並產生一份新的物件 */
record.setMapValue = function(template: Record<string, any>, data: Record<string, any>): any;

const template = {
    name: 'dave',
    age: 18 // data 沒有 age，採用原本的值
}

const data = {
    name: 'james', // 共同有 name 的 key 值，所以複寫 template 的 name
    sex: 'M' // template 沒有 sex，忽略
}

console.log(record.setMapValue(template, data)) // { name: 'james', age: 18 }
```
