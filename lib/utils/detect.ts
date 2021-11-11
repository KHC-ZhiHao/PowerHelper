/**
 * 是否正在 Line、Messenger 等 in app browser 裡面執行
 * @description 並不嚴謹，僅供參考使用
 */

export const inAppBrowser = () => {
    if (navigator == null) {
        return false
    }
    let u = navigator.userAgent
    let ua = navigator.userAgent.toLowerCase()
    let isLineApp = u.indexOf('Line') > -1
    let isFbApp = u.indexOf('FBAV') > -1
    let isWeixinApp = !!ua.match(/MicroMessenger/)
    return !!isLineApp || !!isFbApp || !!isWeixinApp || false
}

/**
 * 是否正在 IoS 或是 Android 系統裡面執行
 */

export const inMobile = () => {
    return inIOS() || inAndroid()
}

/**
 * 是否正在 IoS 系統裡面執行
 */

export const inIOS = () => {
    if (navigator == null) {
        return false
    }
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

/**
 * 是否正在 Android 系統裡面執行
 */

export const inAndroid = () => {
    if (navigator == null) {
        return false
    }
    let ua = navigator.userAgent.toLowerCase()
    return ua.indexOf('android') > -1
}

/**
 * 是否正在 Safari 系統裡面執行
 */

export const inSafari = () => {
    if (navigator == null) {
        return false
    }
    let ua = navigator.userAgent
    let iOS = !!ua.match(/iP(ad|od|hone)/i)
    let hasSafariInUa = !!ua.match(/Safari/i)
    let noOtherBrowsersInUa = !ua.match(/Chrome|CriOS|OPiOS|mercury|FxiOS|Firefox/i)
    let result = false
    if (iOS) {
        let webkit = !!ua.match(/WebKit/i)
        result = webkit && hasSafariInUa && noOtherBrowsersInUa
    // @ts-ignore
    } else if (window.safari !== undefined) {
        result = true
    } else {
        result = hasSafariInUa && noOtherBrowsersInUa
    }
    return result
}
