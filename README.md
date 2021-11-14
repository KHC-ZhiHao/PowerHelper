# Power Helper

本套件是一種常用的工具集成，包括 Module，TS Type、Utils。

你可把他想像成是一種稍微複雜點的 Lodash，在稍微複雜化的前後端環境中能用上本套件 50% 以上的功能。

## 安裝

```bash
npm install power-helper --save
```

## TypeScript 環境

PowerHelper 完整支援 TypeScript 環境，並且建議你在 TypeScript 中進行開發，因為考慮到效能上的增減，PowerHelper 只依賴 TypeScript 進行資料型態的檢查。

## 如何使用？

PowerHelper 分成三個區塊，相關敘述如下：

### Utils

大多由單純的 Function 組成。

```ts
// utils
import { array } from 'power-helper'
const groupArray = array.groups(3, [1, 2, 3, 4, 5, 6])
```

[array](./docs/array.md)

### Modules

基本上是一組提供繼承的 Class，也可以單獨使用。

```ts
// modules
import { Log } from 'power-helper'
const log = new Log('my-first-log')
```

[Log](./docs/Log.md)
[Cache](./docs/Cache.md)

### Types

將複雜的型態方案進行封裝，提高開發的安全性與效率。

``` ts
// types
import type { YYYYMMDDFormat } from 'power-helper/types/date'
const birthday: YYYYMMDDFormat = '2021-01-01'
```
