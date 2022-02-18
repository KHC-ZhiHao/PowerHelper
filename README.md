<br>
<p align="center"><img style="max-width: 300px" src="./logo.png"></p>

<h1 align="center">Power Helper</h1>
<h3 align="center">Javascript Utils Package</h3>

<p align="center">
    <a href="https://www.npmjs.com/package/power-helper">
        <img src="https://img.shields.io/npm/v/power-helper.svg">
    </a>
    <a href='https://github.com/KHC-ZhiHao/PowerHelper/actions'>
        <img src='https://github.com/KHC-ZhiHao/PowerHelper/actions/workflows/build.yml/badge.svg'/>
    </a>
    <a href='https://coveralls.io/github/KHC-ZhiHao/PowerHelper?branch=master'>
        <img src='https://coveralls.io/repos/github/KHC-ZhiHao/PowerHelper/badge.svg?branch=master'/>
    </a>
    <a href="https://standardjs.com/">
        <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
    </a>
    <a href="https://lgtm.com/projects/g/KHC-ZhiHao/PowerHelper/context:javascript">
        <img src="https://img.shields.io/lgtm/grade/javascript/g/KHC-ZhiHao/PowerHelper.svg?logo=lgtm&logoWidth=18"/>
    </a>
    <a href="https://github.com/KHC-ZhiHao/PowerHelper">
        <img src="https://img.shields.io/github/stars/KHC-ZhiHao/PowerHelper.svg?style=social">
    </a>
    <br>
</p>

<br>

Power Helper 是常用的工具集成，包括 Module，TS Type、Utils，因為功能簡單且不需要任何依賴項目，因此極為精簡。

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

[array](./lib/utils/array.md)

[detect](./lib/utils/detect.md)

[flow](./lib/utils/flow.md)

[json](./lib/utils/json.md)

[text](./lib/utils/text.md)

[pick](./lib/utils/pick.md)

[element](./lib/utils/element.md)

### Modules

基本上是一組提供繼承的 Class，也可以單獨使用。

```ts
// modules
import { Log } from 'power-helper'
const log = new Log('my-first-log')
```

[Log](./lib/modules/log.md)

[Cache](./lib/modules/cache.md)

[Event](./lib/modules/event.md)

[Timer](./lib/modules/timer.md)

[Ticker](./lib/modules/ticker.md)

[Schedule](./lib/modules/schedule.md)

[LocalStorage](./lib/modules/local-storage.md)

[QueryCollection](./lib/modules/query-collection.md)

[WebSocketClient](./lib/modules/websocket.md)

[ElementListenerGroup](./lib/modules/element-listener-group.md)

### Types

將複雜的型態方案進行封裝，提高開發的安全性與效率，當然為了保持包的輕便性，想要更強大的表達式可以使用以下套件。

[utility-types](https://www.npmjs.com/package/utility-types)

[ts-essentials](https://github.com/krzkaczor/ts-essentials)

``` ts
// types
import type { YYYYMMDDFormat } from 'power-helper/types/date'
const birthday: YYYYMMDDFormat = '2021-01-01'
```

[date](./types/date.md)

[pick](./types/pick.md)

[string](./types/string.md)
