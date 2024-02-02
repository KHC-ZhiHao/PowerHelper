import { expect } from 'chai'
import { detect } from './detect'

const { inAndroid, inAppBrowser, inIOS, inMobile, inSafari } = detect

const writeUserAgent = (text: string) => {
    global.window = {
        // @ts-ignore
        navigator: {
            userAgent: text
        }
    }
}

describe('Detect', () => {
    beforeEach(() => {
        // @ts-ignore
        global.window = undefined
    })
    it('in android', function() {
        expect(inAndroid()).to.equal(false)
        expect(inMobile()).to.equal(false)
        writeUserAgent('Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1')
        expect(inIOS()).to.equal(false)
        expect(inAndroid()).to.equal(true)
        expect(inMobile()).to.equal(true)
    })
    it('in ios', function() {
        expect(inIOS()).to.equal(false)
        expect(inMobile()).to.equal(false)
        expect(inSafari()).to.equal(false)
        writeUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/95.0.4638.54')
        expect(inIOS()).to.equal(true)
        expect(inMobile()).to.equal(true)
        expect(inSafari()).to.equal(true)
        expect(inAndroid()).to.equal(false)
    })
    it('in safari 1', function() {
        expect(inSafari()).to.equal(false)
        writeUserAgent('Mozilla/5.0 AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/95.0.4638.54')
        expect(inSafari()).to.equal(true)
    })
    it('in safari 2', function() {
        global.window = {
            // @ts-ignore
            safari: true,
            // @ts-ignore
            navigator: {
                userAgent: '12'
            }
        }
        expect(inSafari()).to.equal(true)
    })
    it('in app browser', function() {
        expect(inAppBrowser()).to.equal(false)
        writeUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/95.0.4638.54')
        expect(inAppBrowser()).to.equal(false)
        writeUserAgent('Mozilla/5.0 (Linux; Android 5.0.2; HTC_One_max Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 Line/7.0.1/IAB')
        expect(inAppBrowser()).to.equal(true)
    })
})
