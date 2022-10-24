<br>
<p align="center"><img style="max-width: 300px" src="./logo.png"></p>

<h1 align="center">Power Helper</h1>
<h3 align="center">優雅的 Javascript 工具組</h3>

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

Power Helper 是 JavaScript 的工具集成，功能簡單且無任何依賴項目，極為精簡。

你可把他想像成是一種稍微複雜點的 Lodash，在複雜化的前後端環境中能用上本套件 50% 以上的功能。

## 安裝

### npm

```bash
npm install power-helper
```

### yarn

```bash
yarn add power-helper
```

## TypeScript 環境

PowerHelper 原生採用 TypeScript 環境，且推薦你在 TypeScript 中進行開發。

## 如何使用？

PowerHelper 分成三個區塊，相關敘述如下：

### Utils

大多由單純的 Function 組成。

[array](./lib/utils/array.md) - 優雅的 Array 操作。

* [groups](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#groups) - 將 Array 依照指定數量集成一組。
* [randomPick](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompick) - 從 Array 中隨機獲取一個值。
* [randomPicks](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompicks) - 
從 Array 中隨機獲取指定數量且不重複的值，如果指定數量大於 Array 長度時會傳整組 Array。

[detect](./lib/utils/detect.md) - 驗證當下的執行環境。

* [inAppBrowser](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inappbrowser) - 是否正在 in app browser 裡面執行，很難覆蓋所有應用範圍，僅供參考使用。
* [inMobile](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inmobile) - 是否正在 iOS 或是 Android 系統裡面執行。
* [inIOS](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inios) - 是否正在 iOS 系統裡面執行。
* [inAndroid](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inandroid) - 是否正在 Android 系統裡面執行。
* [inSafari](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#insafari) - 是否正在 Safari 瀏覽器裡面執行。

[flow](./lib/utils/flow.md) - 流程控制的工具。

* [sleep](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#sleep) - 停止執行指定時間(毫秒)。
* [randomInt](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#randomint) - 求整數範圍內的隨機值。
* [createUuid](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createuuid) - 建立一組隨機的 v4 uuid。
* [retry](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#retry) - 優雅的設計有限的重複執行直到成功為止。
* [asyncWhile](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#asyncwhile) - 結合非同步與計數的迴圈操作。


[json](./lib/utils/json.md)

[text](./lib/utils/text.md)

[pick](./lib/utils/pick.md)

[element](./lib/utils/element.md) - 優雅的 Dom 操作。

* [importScript](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript) - 透過執行階段注入 Javascript Tag，這個方法只允許在 Browser 中執行。

[record](./lib/utils/record.md) - 優雅的 Object 操作。

* [setMapValue](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#setmapvalue) - 複製指定物件的值到目標 Object 上，並產生一份新的 Object。

* [createStrictObject](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#createstrictobject) - 建立一組嚴格檢查、轉譯並實質不能變動的 Object，通常應用在環境變數。

### Modules

更強大的複合工具。

[Log](./lib/modules/log.md) - 可以更多變化的 Log。

[Hook](./lib/modules/hook.md) - 基於非同步架構的事件。

[I18n](./lib/modules/i18n.md) - 多語系操作系統。

[Pool](./lib/modules/pool.md) - 輕鬆發出請求與快取請求資料的資料池。

[Cache](./lib/modules/cache.md) - 可以將指定參數請求進行有期限的固定資料存取。

[Event](./lib/modules/event.md) - 基礎的 Pub/Sub 的架構模塊。

[Timer](./lib/modules/timer.md) - 一組計時器，可以正向也可以反向計時。

[Ticker](./lib/modules/ticker.md) - 就如同 setInterval (實際上也是) 一樣運作，只是你可以監聽好幾組事件。

[Loader](./lib/modules/loader.md) - 可以搜集並發出多個 Promise 的加載元件。

[Debounce](./lib/modules/debounce.md) - 去抖動功能，避免頻繁發出請求。

[Resource](./lib/modules/resource.md) - 更優雅的實現獲取檔案路徑。

[Schedule](./lib/modules/schedule.md) - 可以建立多個定時執行系統，且能保證不重複執行。

[Reactive](./lib/modules/reactive.md) - 透過輪詢的方法監聽物件有沒有發生變動。

[Exception](./lib/modules/exception.md) - 高階的錯誤訊息處理工具。

[CacheLite](./lib/modules/cache-lite.md) - 指定鍵值並同步的存取，非常近似 Map，但是有 TTL。

[Breakpoint](./lib/modules/breakpoint.md) - 斷點驗證工具。

[Interaction](./lib/modules/interaction.md) - 建立可監聽、追蹤、可搭配視圖化的訊息整合工具。

[StyleString](./lib/modules/style-string.md) - 方便組合出 HTML Element Style 的工具。

[LocalStorage](./lib/modules/local-storage.md) - 協助你在複雜的網頁應用程式中更安全的操作 LocalStorage。

[PromiseOverlap](./lib/modules/promise-overlap.md) - 控制多次發出相同 Promise 時只獲取第一次或是最後一次的結果。

[QueryCollection](./lib/modules/query-collection.md) - 一定時間內蒐集資料並統一發出。

[WebSocketClient](./lib/modules/websocket.md) - 更高階的 WebSocket 模塊，你可以透過 onMessage 監聽伺服器方的訊息，並透過 event system 發送給其他監聽對象。

[ElementListenerGroup](./lib/modules/element-listener-group.md) - 將 element 的 addEventListener 昇華到更好操作的階段。

### Types

將複雜的型態方案進行封裝，提高開發的安全性與效率。

[date](./types/date.md)

[pick](./types/pick.md)

[string](./types/string.md)

[record](./types/record.md)

Types 只是一種開發 module 時順手的包裝，想要更強大的表達式可以使用以下套件：

[utility-types](https://www.npmjs.com/package/utility-types)

[ts-essentials](https://github.com/krzkaczor/ts-essentials)
