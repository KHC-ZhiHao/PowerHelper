# Checker

[[Source Code]](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/checker.ts)

負責檢查的單元。

```ts
import { checker } from 'power-helper'
```

---

## Methods

### inputAccept

負責檢查檔案是否符合 input tag accept 指定的格式。

```ts
function(targetType: string, fileType: string, fileName?: string): boolean
```

#### example

```ts
const result = checker.inputAccept('image/*', 'image/jpeg', 'test.jpg')
console(result)
/*
    outputs: true
*/
const fromFile = (file: File) => {
    return checker.inputAccept('image/*', file.type, file.name)
}
/*
    outputs: true | false
*/
```
