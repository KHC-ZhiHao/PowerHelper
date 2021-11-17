# Detect

驗證當下執行環境。

## 如何使用

```ts
import { detect } from 'power-helper'
/** 是否正在 Safari 瀏覽器裡面執行 */
detect.inSafari = function() => boolean;
/** 是否正在 Line、Messenger 等 in app browser 裡面執行，並不嚴謹，僅供參考使用 */
detect.inAppBrowser = function() => boolean;
/** 是否正在 IoS 或是 Android 系統裡面執行 */
detect.inMobile = function() => boolean;
/** 是否正在 IoS 系統裡面執行 */
detect.inIOS = function() => boolean;
/** 是否正在 Android 系統裡面執行 */
detect.inAndroid = function() => boolean;
```
