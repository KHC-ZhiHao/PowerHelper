# Text

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.ts)

字串相關的處理。

```ts
import { text } from 'power-helper'
```

---

## Methods

### headMatch

Text 開頭是否符合目標。

```ts
function(text: string, match: string): boolean
```

#### example

```ts
const result = text.headMatch('123@123', '123')
console.log(result)
/*
    outputs: true
*/
```

---

### headMatch

Text 結尾是否符合目標。

```ts
function(text: string, match: string): boolean
```

#### example

```ts
const result = text.lastMatch('123@123', '123')
console.log(result)
/*
    outputs: true
*/
```

---

### byteLength

獲取指定 Text 的 Byte 長度。

```ts
function(text: string): number
```

#### example

```ts
const result = text.byteLength('測試')
console.log(result)
/*
    outputs: 6
*/
```

---

### replaceVar

複寫 Text 的指定變數。

```ts
function(params: {
    /** 變數起始符號 */
    start: string
    /** 變數終止符號 */
    end: string
    /** 複寫文本 */
    text: string
    /** 複寫變數 */
    vars: Record<string, string | number>
    /** 如果找不到對應資料的預設值 */
    defaultVar?: string
}): string
```

#### example

```ts
const result = text.replaceVar({
    start: '{',
    end: '}',
    text: '你好我是 {name}，目前是 {job}。',
    vars: {
        name: 'dave',
        job: 'rd'
    },
    defaultVar: '-'
})
console.log(result)
/*
    outputs: 你好我是 dave，目前是 rd。
*/
```

---

### format

轉換 Text 轉換成指定格式，填入 v 代表映射的值。

```ts
function(format: string, text: string, def: string = '-'): string
```

#### example

```ts
const result = text.format('vvvv-vvv-***', '0900123456')
console.log(result)
/*
    outputs: '0900-123-***'
*/
```

---

### findMatchOrLast

將指定文字限縮指定字組中，如果都不符合則返回最後一個字組，取代 `name === 'dave' ? 'dave' : name === 'james' ? 'james' : 'sam'` 這種場合。

```ts
function<T extends string[]>(target: string, keys: T[]): T
```

#### example

```ts
const result = text.findMatchOrLast('dave', ['dave', 'james', 'sam']))
console.log(result)
/*
    outputs: 'dave'
*/
const result = text.findMatchOrLast('hello', ['dave', 'james', 'sam']))
console.log(result)
/*
    outputs: 'sam'
*/
```

---

### pickInTagContents

只提取文本中指定 Tag 的內容。

```ts
function(params: {
    /** 目標文本 */
    text: string
    /** 開始 Tag */
    start: string
    /** 結束 Tag */
    end: string
}): string[]
```

#### example

```ts
const result = text.pickInTagContents({
    text: '<think>Hello</think> I am PowerHelper <think>World</think>',
    start: '<test>',
    end: '</test>'
})
console.log(result)
/*
    outputs:
    [
        'Hello',
        'World'
    ]
*/
```

---

### removeInTagContents

只刪除文本中指定 Tag 的內容。

```ts
function(params: {
    /** 目標文本 */
    text: string
    /** 開始 Tag */
    start: string
    /** 結束 Tag */
    end: string
}): string
```

#### example

```ts
const result = text.removeInTagContents({
    text: '<think>Hello</think> I am PowerHelper <think>World</think>',
    start: '<test>',
    end: '</test>'
})
console.log(result)
/*
    outputs: ' I am PowerHelper '
*/
```
