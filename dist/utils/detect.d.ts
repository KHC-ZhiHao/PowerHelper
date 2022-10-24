/**
 * 是否正在 Line、Messenger 等 in app browser 裡面執行，很難覆蓋所有應用範圍，僅供參考使用。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inappbrowser
 */
export declare const inAppBrowser: () => boolean;
/**
 * 是否正在 iOS 或是 Android 系統裡面執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inmobile
 */
export declare const inMobile: () => boolean;
/**
 * 是否正在 iOS 系統裡面執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inios
 */
export declare const inIOS: () => boolean;
/**
 * 是否正在 Android 系統裡面執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inandroid
 */
export declare const inAndroid: () => boolean;
/**
 * 是否正在 Safari 瀏覽器裡面執行。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#insafari
 */
export declare const inSafari: () => boolean;
