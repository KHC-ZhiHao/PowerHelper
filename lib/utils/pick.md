# Pick

精準地進行物件選取。

## 如何使用

```ts
import { json } from 'power-helper'
/** 經典的深拷貝方案 JSON.parse(JSON.stringify(data)) */
json.jpjs = function(data: any): any;

/** 如果 Parse 發生錯誤則回傳 {} */
json.nonStrictJSONParse = function(data: string): any;

/** 如果 Stringify 發生錯誤則回傳 '{}' */
json.nonStrictJSONStringify = function(data: any): string;
```
