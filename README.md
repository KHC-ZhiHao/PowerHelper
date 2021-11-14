# Power Helper

本套件是一種常用的工具集成，包括 Module，TS Type、Utils。

你可把他想像成是一種稍微複雜點的 Lodash，在稍微複雜化的前後端環境中能用上本套件 50% 以上的功能。

## 安裝

```bash
npm install power-helper --save
```

## 如何使用？

```ts
// utils
import { array } from 'power-helper'
const groupArray = array.groups(3, [1, 2, 3, 4, 5, 6])

// modules
import { Log } from 'power-helper'
const log = new Log('my-first-log')

// types
import type { YYYYMMDDFormat } from 'power-helper/types/date'
const birthday: YYYYMMDDFormat = '2021-01-01'
```

## 說明文件

[Log](./docs/Log.md)
