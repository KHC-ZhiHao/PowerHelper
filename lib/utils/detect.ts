const getNavigator = () => typeof window === 'undefined' ? null : window.navigator

/**
 * 驗證當下的執行環境。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md
 */

export const detect = {

    /**
     * 是否正在 Line、Messenger 等 in app browser 裡面執行，很難覆蓋所有應用範圍，僅供參考使用。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inappbrowser
     */

    inAppBrowser: () => {
        let navigator = getNavigator()
        if (navigator == null) {
            return false
        }
        let ua = navigator.userAgent.toLowerCase()
        let platforms = [
            'line/',
            'instagram',
            'fbios',
            'fb_iab',
            'fban',
            'fbav',
            'micromessenger'
        ]
        for (let platform of platforms) {
            if (ua.includes(platform)) {
                return true
            }
        }
        return false
    },

    /**
     * 是否正在 iOS 或是 Android 系統裡面執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inmobile
     */

    inMobile: () => {
        return detect.inIOS() || detect.inAndroid()
    },

    /**
     * 是否正在 iOS 系統裡面執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inios
     */

    inIOS: () => {
        let navigator = getNavigator()
        if (navigator == null) {
            return false
        }
        return /iPad|iPhone|iPod/.test(navigator.userAgent)
    },

    /**
     * 是否正在 Android 系統裡面執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#inandroid
     */

    inAndroid: () => {
        let navigator = getNavigator()
        if (navigator == null) {
            return false
        }
        let ua = navigator.userAgent.toLowerCase()
        return ua.indexOf('android') > -1
    },

    /**
     * 是否正在 Safari 瀏覽器裡面執行。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md#insafari
     */

    inSafari: () => {
        let navigator = getNavigator()
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
        } else if (typeof window !== 'undefined' && window.safari !== undefined) {
            result = true
        } else {
            result = hasSafariInUa && noOtherBrowsersInUa
        }
        return result
    }
}
