# Detect

驗證當下的執行環境。

```ts
import { detect } from 'power-helper'
```

---

## Methods

### inSafari

是否正在 Safari 瀏覽器裡面執行。

```ts
function(): boolean
```

#### example

```ts
const inSafari = detect.inSafari()
console.log(inSafari)
/*
    outputs: true | false
*/
```

---

### inAppBrowser

是否正在 Line、Messenger 等 in app browser 裡面執行，很難覆蓋所有應用範圍，僅供參考使用。

```ts
function(): boolean
```

#### example

```ts
const inAppBrowser = detect.inAppBrowser()
console.log(inAppBrowser)
/*
    outputs: true | false
*/
```

---

### inMobile

是否正在 iOS 或是 Android 系統裡面執行。

```ts
function(): boolean
```

#### example

```ts
const inMobile = detect.inMobile()
console.log(inMobile)
/*
    outputs: true | false
*/
```

---

### inIOS

是否正在 iOS 系統裡面執行。

```ts
function(): boolean
```

#### example

```ts
const inIOS = detect.inIOS()
console.log(inIOS)
/*
    outputs: true | false
*/
```
---

### inAndroid

是否正在 Android 系統裡面執行。

```ts
function(): boolean
```

#### example

```ts
const inAndroid = detect.inAndroid()
console.log(inAndroid)
/*
    outputs: true | false
*/
```
