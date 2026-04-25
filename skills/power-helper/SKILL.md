---
name: power-helper
description: This is a basic toolset. If you are planning to complete a complex task, you can refer to these instructions for usage.
---

PowerHelper is divided into three sections:

### Utils

Mostly composed of pure functions.

[calc](.//utils/calc.md) - A utility for calculations.

* [toMs](./utils/calc.md) - Converts a time value in a specified format to milliseconds.

[array](.//utils/array.md) - Elegant array operations.

* [check](./utils/array.md) - Adds a value to an array if it doesn't exist, or removes it if it does.
* [unique](./utils/array.md) - Removes duplicate elements from an array.
* [groups](./utils/array.md) - Groups array elements into chunks of a specified size.
* [asyncMap](./utils/array.md) - An async-compatible map function.
* [randomPick](./utils/array.md) - Picks a random value from an array.
* [randomPicks](./utils/array.md) - Picks a specified number of unique random values from an array. Returns the entire array if the count exceeds its length.

[detect](.//utils/detect.md) - Detects the current runtime environment.

* [inAppBrowser](./utils/detect.md) - Checks if running inside an in-app browser. Coverage is limited; for reference only.
* [inMobile](./utils/detect.md) - Checks if running on iOS or Android.
* [inIOS](./utils/detect.md) - Checks if running on iOS.
* [inAndroid](./utils/detect.md) - Checks if running on Android.
* [inSafari](./utils/detect.md) - Checks if running in the Safari browser.

[flow](.//utils/flow.md) - Flow control utilities.

* [run](./utils/flow.md) - Immediately invokes a function and returns its result.
* [sleep](./utils/flow.md) - Pauses execution for a specified duration (in milliseconds).
* [randomInt](./utils/flow.md) - Returns a random integer within a specified range.
* [createUuid](./utils/flow.md) - Generates a random v4 UUID.
* [createWithTsUuid](./utils/flow.md) - Generates a random v4 UUID prefixed with the current timestamp (ms).
* [retry](./utils/flow.md) - Elegantly retries an operation a limited number of times until it succeeds.
* [asyncWhile](./utils/flow.md) - An async loop combining asynchronous execution with a counter.
* [waitFor](./utils/flow.md) - A flow control utility for waiting on a condition.

[json](.//utils/json.md) - Elegant JSON format handling.

* [jpjs](./utils/json.md) - The classic deep clone: `JSON.parse(JSON.stringify(data))`.
* [nonStrictJSONParse](./utils/json.md) - Runs JSON.parse; returns `{}` on failure.
* [nonStrictJSONStringify](./utils/json.md) - Runs JSON.stringify; returns `'{}'` on failure.

[text](.//utils/text.md) - String-related utilities.

* [headMatch](./utils/text.md) - Checks if text starts with the target.
* [lastMatch](./utils/text.md) - Checks if text ends with the target.
* [byteLength](./utils/text.md) - Gets the byte length of the specified text.
* [replaceVar](./utils/text.md) - Replaces named variables in a text string.
* [format](./utils/text.md) - Formats text into a specified pattern, using `v` as the mapped value placeholder.
* [findMatchOrLast](./utils/text.md) - Constrains text to a set of options; returns the last option if none match.
* [pickInTagContents](./utils/text.md) - Extracts only the content within specified tags from text.
* [removeInTagContents](./utils/text.md) - Removes only the content within specified tags from text.

[pick](.//utils/pick.md) - Precisely extract target values.

* [ifBad](./utils/pick.md) - Returns a default value if the value is `null | undefined | Error | NaN`.
* [ifEmpty](./utils/pick.md) - Returns a default value if the value is `null | undefined`.
* [getType](./utils/pick.md) - Returns a more precise type than `typeof`.
* [peel](./utils/pick.md) - Gets the value at a specified path; returns `null` if not found.
* [vars](./utils/pick.md) - Gets the list of variables found within a string.

[checker](.//utils/checker.md) - Data validators.

* [inputAccept](./utils/checker.md) - Checks whether a file matches the format specified by an input tag's `accept` attribute.

[element](.//utils/element.md) - Elegant DOM operations.

* [importScript](./utils/element.md) - Injects a JavaScript tag at runtime. Browser only.
* [importCss](./utils/element.md) - Injects a stylesheet link tag at runtime. Browser only.
* [createAndAppend](./utils/element.md) - Creates a tag and appends it to the specified element. Browser only.

[record](.//utils/record.md) - Elegant object operations.

* [omit](./utils/record.md) - Shallow-copies an object while omitting specified keys.
* [simpleCheckDeepDiff](./utils/record.md) - Simply checks if two objects differ; returns `true` if they do. Supports all JSON-compatible types.
* [setMapValue](./utils/record.md) - Copies values from a source object onto a target object and returns a new object.
* [createStrictObject](./utils/record.md) - Creates a strictly validated, translated, and immutable object. Typically used for environment variables.
* [promiseAllWithKeys](./utils/record.md) - A key-value pair version of `Promise.all`.

### Modules

More powerful composite tools.

[Log](.//modules/log.md) - A more flexible logging utility.

[Hook](.//modules/hook.md) - Async-based event system.

[I18n](.//modules/i18n.md) - Multi-language operation system.

[Once](.//modules/once.md) - An async event that executes only once.

[Pool](.//modules/pool.md) - A data pool for easily making requests and caching response data.

[Cache](.//modules/cache.md) - Caches request results for specified parameters with an expiration time.

[Asset](.//modules/asset.md) - A resource loading tool for initializing required static assets.

[Event](.//modules/event.md) - A simple event emitter for listening to and triggering events.

[Timer](.//modules/timer.md) - A timer that can count up or count down.

[Ticker](.//modules/ticker.md) - Works like `setInterval` (and actually is), but allows multiple event listeners.

[Loader](.//modules/loader.md) - A loading component that collects and dispatches multiple promises.

[Debounce](.//modules/debounce.md) - Debounce functionality that collects results and delays execution after an event fires, preventing frequent requests.

[Resource](.//modules/resource.md) - A more elegant way to fetch various static resources.

[Schedule](.//modules/schedule.md) - Creates multiple scheduled execution systems with guaranteed non-overlapping runs.

[Reactive](.//modules/reactive.md) - Listens for object changes via polling.

[JobsQueue](.//modules/jobs-queue.md) - Limited batch job execution.

[Exception](.//modules/exception.md) - An advanced error message handling tool.

[CacheLite](.//modules/cache-lite.md) - Synchronous key-value access, similar to Map but with TTL support.

[Breakpoint](.//modules/breakpoint.md) - A viewport breakpoint detection tool.

[Interaction](.//modules/interaction.md) - Builds listenable, trackable, and visualizable message integration tools.

[StyleString](.//modules/style-string.md) - A tool for conveniently composing HTML element style strings.

[LocalStorage](.//modules/local-storage.md) - Helps you operate LocalStorage more safely in complex web applications.

[AsyncLocalStorage](.//modules/async-local-storage.md) - Async LocalStorage operations to support more usage patterns.

[PromiseOverlap](.//modules/promise-overlap.md) - Controls multiple identical promise calls to return only the first or the last result.

[QueryCollection](.//modules/query-collection.md) - Collects data within a time window and dispatches it all at once.

[WebSocketClient](.//modules/websocket.md) - A WebSocket module with reconnection and channel support. Listen to server messages via `onMessage` and broadcast to other listeners via the event system.

[ElementListenerGroup](.//modules/element-listener-group.md) - Elevates element `addEventListener` to a more manageable level.

[PreloadPort](.//modules/preload-port.md) - Preloads data and passes it to consumers by ID.