/**
 * 是否正在 Line、Messenger 等 in app browser 裡面執行
 * @description 並不嚴謹，僅供參考使用
 */
export declare const inAppBrowser: () => boolean;
/**
 * 是否正在 IoS 或是 Android 系統裡面執行
 */
export declare const inMobile: () => boolean;
/**
 * 是否正在 IoS 系統裡面執行
 */
export declare const inIOS: () => boolean;
/**
 * 是否正在 Android 系統裡面執行
 */
export declare const inAndroid: () => boolean;
/**
 * 是否正在 Safari 系統裡面執行
 */
export declare const inSafari: () => boolean;
