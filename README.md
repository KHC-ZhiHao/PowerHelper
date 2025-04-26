<br>
<p align="center"><img style="max-width: 300px" src="./logo.png"></p>

<h1 align="center">Power Helper</h1>
<h3 align="center">優雅的 Javascript 工具組</h3>

<h6 align="center">
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
    <a href="https://github.com/KHC-ZhiHao/PowerHelper">
        <img src="https://img.shields.io/github/stars/KHC-ZhiHao/PowerHelper.svg?style=social">
    </a>
    <br>
</h6>

<br>

Power Helper 是一套整合了多種 JavaScript 工具的輕量化集成工具，它非常簡潔，並且不需要任何依賴項目。這套工具可以被視為一種較為複雜的 Lodash，它可以支援幾乎所有的 JavaScript 環境。

在開發過程中，我們遵照以下幾點讓開發者能夠獲得最佳的開發體驗：

* 對產品進行了完整的測試覆蓋，確保產品的可靠性。
* 提供了完善的中文文件支援，以幫助使用者快速上手。
* 持續改善程式碼品質，確保產品的可維護性和可擴展性。
* 為編輯器提供了完整的提示，以幫助使用者更高效地進行開發。
* 提供了完整的 TypeScript 支援，以幫助使用者更好地進行開發。

## 安裝

### npm

```bash
npm install power-helper
```

### yarn

```bash
yarn add power-helper
```

## 如何使用？

PowerHelper 分成三個區塊，相關敘述如下：

### Utils

大多由單純的 Function 組成。

[calc](./lib/utils/calc.md) - 負責計算的單元。

* [toMs](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/calc.md#toms) - 將指定時間格式的數值轉換成毫秒。

[array](./lib/utils/array.md) - 優雅的 Array 操作。

* [check](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#check) - 如果 Array 沒有指定的值，加入該值，如果有則移除。
* [unique](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#unique) - 移除 Array 中相同的元素。
* [groups](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#groups) - 將 Array 依照指定數量集成一組。
* [asyncMap](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#asyncmap) - 允許非同步進行的 map。
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

* [run](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#run) - 直接運行方法並返回結果。
* [sleep](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#sleep) - 停止執行指定時間(毫秒)。
* [randomInt](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#randomint) - 求整數範圍內的隨機值。
* [createUuid](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createuuid) - 建立一組隨機的 v4 uuid。
* [createWithTsUuid](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createwithtsuuid) - 建立一組隨機的 v4 uuid，但在前面加上當下的 timestamp(ms)。
* [retry](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#retry) - 優雅的設計有限的重複執行直到成功為止。
* [asyncWhile](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#asyncwhile) - 結合非同步與計數的迴圈操作。
* [waitFor](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#waitfor) - 流程控制的工具。

[json](./lib/utils/json.md) - 優雅的 JSON 格式相關處理。

* [jpjs](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#jpjs) - 經典的深拷貝方案 JSON.parse(JSON.stringify(data))。
* [nonStrictJSONParse](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonparse) - 執行 JSON Parse，如果失敗回傳空白物件 `{}`。
* [nonStrictJSONStringify](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonstringify) - 執行 JSON Stringify，如果失敗回傳字串 `'{}'`。

[text](./lib/utils/text.md) - 字串相關的處理。

* [headMatch](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#headmatch) - Text 開頭是否符合目標。
* [lastMatch](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#lastmatch) - Text 結尾是否符合目標。
* [byteLength](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#bytelength) - 獲取指定 Text 的 Byte 長度。
* [replaceVar](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#replacevar) - 複寫 Text 的指定變數。
* [format](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#format) - 轉換 Text 轉換成指定格式，填入 v 代表映射的值。
* [findMatchOrLast](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#findmatchorlast) - 將指定文字限縮指定字組中，如果都不符合則返回最後一個字組。
* [pickInTagContents](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#pickintagcontents) - 只提取文本中指定 Tag 的內容。
* [removeInTagContents](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#removeintagcontents) - 只刪除文本中指定 Tag 的內容。

[pick](./lib/utils/pick.md) - 精準地提取目標相關資源。

* [ifBad](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifbad) - 值如果是 null | undefined | Error | NaN，則回傳預設值。
* [ifEmpty](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifempty) - 值如果是 null | undefined，則回傳預設值。
* [getType](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#gettype) - 比 typeof 回傳更精準的類型。
* [peel](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#peel) - 獲取指定路徑的值，如果值不存在回傳 `null`。
* [vars](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#vars) - 獲取文字裡面的變數列表。

[checker](./lib/utils/checker.md) - 資料檢查器。

* [inputAccept](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/checker.md#inputaccept) - 負責檢查檔案是否符合 input tag accept 指定的格式。

[element](./lib/utils/element.md) - 優雅的 Dom 操作。

* [importScript](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript) - 透過執行階段注入 Javascript Tag，這個方法只允許在 Browser 中執行。
* [importCss](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importcss) - 透過執行階段注入帶 stylesheet 的 Link Tag，這個方法只允許在 Browser 中執行。
* [createAndAppend](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#createandappend) - 新增並將 Tag Append 至指定 Element，這個方法只允許在 Browser 中執行。

[record](./lib/utils/record.md) - 優雅的 Object 操作。

* [omit](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#omit) - 淺拷貝同一份 Object，但忽略掉指定對象。
* [simpleCheckDeepDiff](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#simplecheckdeepdiff) - 簡易比對兩個 Object 是否有差異，有差異回傳 true，僅支援 JSON 的所有型態。
* [setMapValue](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#setmapvalue) - 複製指定物件的值到目標 Object 上，並產生一份新的 Object。
* [createStrictObject](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#createstrictobject) - 建立一組嚴格檢查、轉譯並實質不能變動的 Object，通常應用在環境變數。
* [promiseAllWithKeys](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#promiseallwithkeys) - Promise.all 的鍵值對版本。

### Modules

更強大的複合工具。

[Log](./lib/modules/log.md) - 可以更多變化的 Log。

[Hook](./lib/modules/hook.md) - 基於非同步架構的事件。

[I18n](./lib/modules/i18n.md) - 多語系操作系統。

[Once](./lib/modules/once.md) - 只會執行一次的非同步事件。

[Pool](./lib/modules/pool.md) - 輕鬆發出請求與快取請求資料的資料池。

[Cache](./lib/modules/cache.md) - 可以將指定參數請求進行有期限的固定資料存取。

[Asset](./lib/modules/asset.md) - 資源載入工具，目的是初始化必要的靜態資源。

[Event](./lib/modules/event.md) - 簡單的事件監聽器，可以用來監聽和觸發事件。

[Timer](./lib/modules/timer.md) - 一組計時器，可以正向也可以反向計時。

[Ticker](./lib/modules/ticker.md) - 就如同 setInterval (實際上也是) 一樣運作，只是你可以監聽好幾組事件。

[Loader](./lib/modules/loader.md) - 可以搜集並發出多個 Promise 的加載元件。

[Debounce](./lib/modules/debounce.md) - 去抖動功能，當觸發事件後會搜集結果並延遲事件發生，避免頻繁發出請求。

[Resource](./lib/modules/resource.md) - 更優雅的實現獲取各類靜態資源。

[Schedule](./lib/modules/schedule.md) - 可以建立多個定時執行系統，且能保證不重複執行。

[Reactive](./lib/modules/reactive.md) - 透過輪詢的方法監聽物件有沒有發生變動。

[JobsQueue](./lib/modules/jobs-queue.md) - 有限的批次執行作業。

[Exception](./lib/modules/exception.md) - 高階的錯誤訊息處理工具。

[CacheLite](./lib/modules/cache-lite.md) - 指定鍵值並同步的存取，非常近似 Map，但是有 TTL。

[Breakpoint](./lib/modules/breakpoint.md) - 畫面斷點驗證工具。

[Interaction](./lib/modules/interaction.md) - 建立可監聽、追蹤、可搭配視圖化的訊息整合工具。

[StyleString](./lib/modules/style-string.md) - 方便組合出 HTML Element Style 的工具。

[LocalStorage](./lib/modules/local-storage.md) - 協助你在複雜的網頁應用程式中更安全的操作 LocalStorage。

[AsyncLocalStorage](./lib/modules/async-local-storage.md) - 非同步的操作 LocalStorage，有助於擴展更多應用模式。

[PromiseOverlap](./lib/modules/promise-overlap.md) - 控制多次發出相同 Promise 時只獲取第一次或是最後一次的結果。

[QueryCollection](./lib/modules/query-collection.md) - 一定時間內蒐集資料並統一發出。

[WebSocketClient](./lib/modules/websocket.md) - 具有重新連線與頻道模式的 WebSocket 模塊，你可以透過 onMessage 監聽伺服器方的訊息，並透過 event system 發送給其他監聽對象。

[ElementListenerGroup](./lib/modules/element-listener-group.md) - 將 element 的 addEventListener 昇華到更好操作的階段。

[PreloadPort](./lib/modules/preload-port.md) - 可以預先載入資料並透過 id 傳遞給需要的對象。

### Types

將複雜的型態方案進行封裝，提高開發的安全性與效率。

[date](./lib/types/date.md)

[pick](./lib/types/pick.md)

[string](./lib/types/string.md)

[record](./lib/types/record.md)

```js
import { TDate, TPick, TRecord, TString } from 'power-helper'
```

Types 只是一種開發 module 時順手的包裝，想要更強大的表達式可以使用以下套件：

[utility-types](https://www.npmjs.com/package/utility-types)

[ts-essentials](https://github.com/krzkaczor/ts-essentials)

### Versions

#### 0.6.0

* [新增] - Websocket 新增 keepAlive 保持連線功能。
* [修正] - 標準化 Event 相關的 Channel 命名。
* [修正] - job-queues -> jobs-queue。
* [優化] - 優化文件。

#### 0.7.0

我們對打包形態和文件進行了調整，可以讓整個開發體驗獲得最佳化。

##### Breaking Changes

* CacheLite - expTime 參數改為 ttl。
* Cache - keepAlive 參數改為 ttl。

#### 0.8.0

改用 Es Module 的引入方式。
