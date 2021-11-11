/**
 * 如果 Parse 發生錯誤則回傳 {}
 */

export const notStrictJSONParse = (data: string) => {
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
 * 如果 Stringify 發生錯誤則回傳 '{}'
 */

export const notStrictJSONStringify = (data: Record<string, any>) => {
    try {
        return JSON.stringify(data)
    } catch (error) {
        return '{}'
    }
}
