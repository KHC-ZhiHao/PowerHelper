/**
 * 優雅的 JSON 格式相關處理。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md
 */

export const json = {
    /**
     * 經典的深拷貝方案 JSON.parse(JSON.stringify(data))。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#jpjs
     */

    jpjs: <T>(data: T, replacer?: (key: string, value: any) => any): T => {
        return JSON.parse(JSON.stringify(data, replacer))
    },

    /**
     * 執行 JSON Parse，如果失敗回傳空白物件 `{}`。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonparse
     */

    nonStrictJSONParse: (data: string) => {
        try {
            if (typeof data === 'string') {
                return JSON.parse(data)
            } else {
                return data
            }
        } catch (error) {
            return {}
        }
    },

    /**
     * 執行 JSON Stringify，如果失敗回傳字串 `'{}'`。
     * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md#nonstrictjsonstringify
     */

    nonStrictJSONStringify: (data: Record<string, any>) => {
        try {
            return JSON.stringify(data)
        } catch (error) {
            return '{}'
        }
    }

}
