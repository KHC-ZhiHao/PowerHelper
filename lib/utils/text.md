# Text

字串相關的處理。

## 如何使用

```ts
import { text } from 'power-helper'
/** 字串開頭是否符合指定目標 */
text.headMatch = function(text: string, match: string): boolean;

/** 獲取指定字串的 Byte 長度 */
text.byteLength = function(text: string): number;

/**
 * 複寫字串的指定變數。
 * @example
 * let result = replaceVar({
 *  start: '{',
 *  end: '}',
 *  text: '你好我是 {name}，目前是 {job}。',
 *  vars: {
 *    name: 'dave',
 *    job: 'rd'
 *  },
 *  dafaultVar: '-'
 * })
 * console.log(result) // 你好我是 dave，目前是 rd。
 */

text.replaceVar = function(params: {
    start: string
    end: string
    text: string
    vars: Record<string, string | number>
    // 如果沒有定義變數則覆蓋預設值
    dafaultVar?: string
}): string;
```
