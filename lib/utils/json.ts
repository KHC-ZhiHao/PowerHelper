/**
 * 經典的深拷貝方案 JSON.parse(JSON.stringify(data))
 */

export const jpjs = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data))
}

/**
 * 如果 Parse 發生錯誤則回傳 {}
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
 * 如果 Stringify 發生錯誤則回傳 '{}'
 */

export const nonStrictJSONStringify = (data: Record<string, any>) => {
    try {
        return JSON.stringify(data)
    } catch (error) {
        return '{}'
    }
}
