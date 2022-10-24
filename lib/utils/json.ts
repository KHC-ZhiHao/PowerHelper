/**
 * 經典的深拷貝方案 JSON.parse(JSON.stringify(data))。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#jpjs
 */

export const jpjs = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data))
}

/**
 * 執行 JSON Parse，如果失敗回傳空白物件 `{}`。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonparse
 */

export const nonStrictJSONParse = (data: string) => {
    try {
        if (typeof data === 'string') {
            return JSON.parse(data)
        } else {
            return data
        }
    } catch (error) {
        return {}
    }
}

/**
 * 執行 JSON Stringify，如果失敗回傳字串 `'{}'`。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonstringify
 */

export const nonStrictJSONStringify = (data: Record<string, any>) => {
    try {
        return JSON.stringify(data)
    } catch (error) {
        return '{}'
    }
}
