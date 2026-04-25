<br>
<p align="center"><img style="max-width: 300px" src="./logo.png"></p>

<h1 align="center">Power Helper</h1>
<h3 align="center">An Elegant JavaScript Utility Toolkit</h3>

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

[繁體中文說明](./README_ZH.md)

Power Helper is a lightweight JavaScript utility toolkit that integrates a wide variety of tools. It is clean, requires no dependencies, and can be seen as a more feature-rich alternative to Lodash. It supports virtually all JavaScript environments.

During development, we follow these principles to provide the best developer experience:

* Full test coverage to ensure product reliability.
* Comprehensive documentation to help users get started quickly.
* Continuous improvement of code quality for maintainability and extensibility.
* Complete editor hints for a more efficient development workflow.
* Full TypeScript support for a better development experience.

## Installation

### npm

```bash
npm install power-helper
```

### yarn

```bash
yarn add power-helper
```

## How to Use

PowerHelper is divided into three sections:

### Utils

Mostly composed of pure functions.

[calc](./lib/utils/calc.md) - A utility for calculations.

* [toMs](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/calc.md#toms) - Converts a time value in a specified format to milliseconds.

[array](./lib/utils/array.md) - Elegant array operations.

* [check](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#check) - Adds a value to an array if it doesn't exist, or removes it if it does.
* [unique](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#unique) - Removes duplicate elements from an array.
* [groups](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#groups) - Groups array elements into chunks of a specified size.
* [asyncMap](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#asyncmap) - An async-compatible map function.
* [randomPick](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompick) - Picks a random value from an array.
* [randomPicks](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md#randompicks) - Picks a specified number of unique random values from an array. Returns the entire array if the count exceeds its length.

[detect](./lib/utils/detect.md) - Detects the current runtime environment.

* [inAppBrowser](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inappbrowser) - Checks if running inside an in-app browser. Coverage is limited; for reference only.
* [inMobile](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inmobile) - Checks if running on iOS or Android.
* [inIOS](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inios) - Checks if running on iOS.
* [inAndroid](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inandroid) - Checks if running on Android.
* [inSafari](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#insafari) - Checks if running in the Safari browser.

[flow](./lib/utils/flow.md) - Flow control utilities.

* [run](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#run) - Immediately invokes a function and returns its result.
* [sleep](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#sleep) - Pauses execution for a specified duration (in milliseconds).
* [randomInt](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#randomint) - Returns a random integer within a specified range.
* [createUuid](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createuuid) - Generates a random v4 UUID.
* [createWithTsUuid](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#createwithtsuuid) - Generates a random v4 UUID prefixed with the current timestamp (ms).
* [retry](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#retry) - Elegantly retries an operation a limited number of times until it succeeds.
* [asyncWhile](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#asyncwhile) - An async loop combining asynchronous execution with a counter.
* [waitFor](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md#waitfor) - A flow control utility for waiting on a condition.

[json](./lib/utils/json.md) - Elegant JSON format handling.

* [jpjs](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#jpjs) - The classic deep clone: `JSON.parse(JSON.stringify(data))`.
* [nonStrictJSONParse](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonparse) - Runs JSON.parse; returns `{}` on failure.
* [nonStrictJSONStringify](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonstringify) - Runs JSON.stringify; returns `'{}'` on failure.

[text](./lib/utils/text.md) - String-related utilities.

* [headMatch](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#headmatch) - Checks if text starts with the target.
* [lastMatch](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#lastmatch) - Checks if text ends with the target.
* [byteLength](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#bytelength) - Gets the byte length of the specified text.
* [replaceVar](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#replacevar) - Replaces named variables in a text string.
* [format](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#format) - Formats text into a specified pattern, using `v` as the mapped value placeholder.
* [findMatchOrLast](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#findmatchorlast) - Constrains text to a set of options; returns the last option if none match.
* [pickInTagContents](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#pickintagcontents) - Extracts only the content within specified tags from text.
* [removeInTagContents](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md#removeintagcontents) - Removes only the content within specified tags from text.

[pick](./lib/utils/pick.md) - Precisely extract target values.

* [ifBad](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifbad) - Returns a default value if the value is `null | undefined | Error | NaN`.
* [ifEmpty](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#ifempty) - Returns a default value if the value is `null | undefined`.
* [getType](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#gettype) - Returns a more precise type than `typeof`.
* [peel](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#peel) - Gets the value at a specified path; returns `null` if not found.
* [vars](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md#vars) - Gets the list of variables found within a string.

[checker](./lib/utils/checker.md) - Data validators.

* [inputAccept](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/checker.md#inputaccept) - Checks whether a file matches the format specified by an input tag's `accept` attribute.

[element](./lib/utils/element.md) - Elegant DOM operations.

* [importScript](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importscript) - Injects a JavaScript tag at runtime. Browser only.
* [importCss](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#importcss) - Injects a stylesheet link tag at runtime. Browser only.
* [createAndAppend](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md#createandappend) - Creates a tag and appends it to the specified element. Browser only.

[record](./lib/utils/record.md) - Elegant object operations.

* [omit](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#omit) - Shallow-copies an object while omitting specified keys.
* [simpleCheckDeepDiff](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#simplecheckdeepdiff) - Simply checks if two objects differ; returns `true` if they do. Supports all JSON-compatible types.
* [setMapValue](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#setmapvalue) - Copies values from a source object onto a target object and returns a new object.
* [createStrictObject](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#createstrictobject) - Creates a strictly validated, translated, and immutable object. Typically used for environment variables.
* [promiseAllWithKeys](https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#promiseallwithkeys) - A key-value pair version of `Promise.all`.

### Modules

More powerful composite tools.

[Log](./lib/modules/log.md) - A more flexible logging utility.

[Hook](./lib/modules/hook.md) - Async-based event system.

[I18n](./lib/modules/i18n.md) - Multi-language operation system.

[Once](./lib/modules/once.md) - An async event that executes only once.

[Pool](./lib/modules/pool.md) - A data pool for easily making requests and caching response data.

[Cache](./lib/modules/cache.md) - Caches request results for specified parameters with an expiration time.

[Asset](./lib/modules/asset.md) - A resource loading tool for initializing required static assets.

[Event](./lib/modules/event.md) - A simple event emitter for listening to and triggering events.

[Timer](./lib/modules/timer.md) - A timer that can count up or count down.

[Ticker](./lib/modules/ticker.md) - Works like `setInterval` (and actually is), but allows multiple event listeners.

[Loader](./lib/modules/loader.md) - A loading component that collects and dispatches multiple promises.

[Debounce](./lib/modules/debounce.md) - Debounce functionality that collects results and delays execution after an event fires, preventing frequent requests.

[Resource](./lib/modules/resource.md) - A more elegant way to fetch various static resources.

[Schedule](./lib/modules/schedule.md) - Creates multiple scheduled execution systems with guaranteed non-overlapping runs.

[Reactive](./lib/modules/reactive.md) - Listens for object changes via polling.

[JobsQueue](./lib/modules/jobs-queue.md) - Limited batch job execution.

[Exception](./lib/modules/exception.md) - An advanced error message handling tool.

[CacheLite](./lib/modules/cache-lite.md) - Synchronous key-value access, similar to Map but with TTL support.

[Breakpoint](./lib/modules/breakpoint.md) - A viewport breakpoint detection tool.

[Interaction](./lib/modules/interaction.md) - Builds listenable, trackable, and visualizable message integration tools.

[StyleString](./lib/modules/style-string.md) - A tool for conveniently composing HTML element style strings.

[LocalStorage](./lib/modules/local-storage.md) - Helps you operate LocalStorage more safely in complex web applications.

[AsyncLocalStorage](./lib/modules/async-local-storage.md) - Async LocalStorage operations to support more usage patterns.

[PromiseOverlap](./lib/modules/promise-overlap.md) - Controls multiple identical promise calls to return only the first or the last result.

[QueryCollection](./lib/modules/query-collection.md) - Collects data within a time window and dispatches it all at once.

[WebSocketClient](./lib/modules/websocket.md) - A WebSocket module with reconnection and channel support. Listen to server messages via `onMessage` and broadcast to other listeners via the event system.

[ElementListenerGroup](./lib/modules/element-listener-group.md) - Elevates element `addEventListener` to a more manageable level.

[PreloadPort](./lib/modules/preload-port.md) - Preloads data and passes it to consumers by ID.

### Types

Encapsulates complex type patterns to improve development safety and efficiency.

[date](./lib/types/date.md)

[pick](./lib/types/pick.md)

[string](./lib/types/string.md)

[record](./lib/types/record.md)

```js
import { TDate, TPick, TRecord, TString } from 'power-helper'
```

Types are a convenient wrapper for module development. For more powerful type expressions, consider the following packages:

[utility-types](https://www.npmjs.com/package/utility-types)

[ts-essentials](https://github.com/krzkaczor/ts-essentials)

### Versions

#### 0.6.0

* [Added] - WebSocket adds `keepAlive` connection persistence.
* [Fixed] - Standardized Event channel naming.
* [Fixed] - `job-queues` renamed to `jobs-queue`.
* [Improved] - Documentation improvements.

#### 0.7.0

We adjusted the build format and documentation to optimize the overall developer experience.

##### Breaking Changes

* CacheLite - `expTime` parameter renamed to `ttl`.
* Cache - `keepAlive` parameter renamed to `ttl`.

#### 0.8.0

Switched to ES Module import style.
