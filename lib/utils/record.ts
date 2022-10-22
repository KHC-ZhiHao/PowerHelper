import { jpjs } from './json'
import { getType } from './pick'
import { PeelPath } from '../types/pick'
import { DeepReadonly } from '../types/record'

type JsonObject = string | number | boolean | unknown | unknown[] | null | JsonObject[] | {
    [key: string]: JsonObject
}

type SetMapValueOptions<T> = {
    directReplacePeels?: PeelPath<'', T>[]
}

/**
 * 複製指定物件的值到目標物件上，並產生一份新的物件。
 * @example
 * const template = {
 *     name: 'dave',
 *     age: 18, // data 沒有 age，採用原本的值
 *     parents: ['mother', 'father'],
 *     carts: {
 *         bike: {
 *             name: 'gt',
 *             boughtAt: '2022-01-01'
 *         }
 *     }
 * }
 * const data = {
 *     name: 'james', // 共同有 name 的 key 值，所以複寫 template 的 name
 *     sex: 'M', // template 沒有 sex，忽略
 *     parents: ['sister'] // 如果是陣列會直接複寫
 *     carts: { // 如果是物件則會深入復寫，可以透過 options.directReplacePeels 直接覆蓋値
 *         bike: {
 *             name: 'ubike'
 *         }
 *     }
 * }
 * console.log(record.setMapValue(template, data. options?))
 * // output
 * {
 *     name: 'james',
 *     age: 18,
 *     parents: ['sister'],
 *     carts: {
 *         name: 'ubike',
 *         boughtAt: '2022-01-01'
 *     }
 * }
 */

export const setMapValue = <T extends JsonObject>(
    template: T,
    target: JsonObject,
    options?: SetMapValueOptions<T>
): T => {
    let handler = (template: T, target: JsonObject, nowPeel = '') => {
        const output: any = {}
        const s: any = template == null ? {} : jpjs(template)
        const t: any = target == null ? {} : jpjs(target)
        for (let key in s) {
            let type = getType(s[key])
            if (type === 'object') {
                let skip = (!!options && !!options.directReplacePeels && options.directReplacePeels.includes(`${nowPeel}${key}` as any))
                if (skip === false) {
                    output[key] = handler(s[key], t[key], `${nowPeel}${key}.`)
                    continue
                }
            }
            if (t[key] == null) {
                output[key] = s[key]
            } else {
                output[key] = t[key]
            }
        }
        return output
    }
    return handler(template, target)
}

type StrictObjectParams = {
    [key: string]: [typeof String | typeof Boolean | typeof Number, boolean, unknown, any?]
}

/**
 * 建立一組嚴格檢查、轉譯並實質不能變動的物件，通常應用在環境變數，防止出現定義問題。
 * @example
 * const env = createStrictObject({
 *     isProd: [Boolean, true, 'true'],
 *     baseUrl: [String, true, process.env.baseUrl],
 *     port: [Number, true, '8080'],
 *     isLocal: [Boolean, false, null, false]
 * })
 * console.log(record.setMapValue(template, data. options?))
 * // output
 * {
 *     isProd: true,
 *     baseUrl: 'http://hello.com',
 *     port: 8080,
 *     isLocal: false
 * }
 */

export const createStrictObject = <T extends StrictObjectParams>(envs: T): DeepReadonly<{
    [key in keyof T]:
        T[key][0] extends typeof String ? string : (
            T[key][0] extends typeof Number ? number : (
                T[key][0] extends typeof Boolean ? boolean : unknown
            )
        )
}> => {
    let output = {} as any
    let keyFail = (key: string, err: string) => new Error(`Strict Object Fail - ${key}: ${err}!`)
    for (let key in envs) {
        let [type, required, value, def] = envs[key]
        let valueType = getType(value)
        let outputValue: any = value
        if (valueType === 'empty') {
            if (required) {
                throw keyFail(key, 'is required')
            }
        } else {
            if (type === String) {
                if (valueType !== 'string') {
                    throw keyFail(key, 'not a string')
                }
                if (required && outputValue.trim() === '') {
                    throw keyFail(key, 'no content')
                }
            }
            if (type === Number) {
                if (valueType !== 'number' && valueType !== 'string') {
                    throw keyFail(key, 'not a number')
                }
                if (valueType === 'string') {
                    outputValue = Number(outputValue.trim())
                }
                if (isNaN(outputValue)) {
                    throw keyFail(key, 'is NaN')
                }
            }
            if (type === Boolean) {
                if (valueType === 'string') {
                    outputValue = outputValue.trim()
                    if (outputValue !== 'true' && outputValue !== 'false') {
                        throw keyFail(key, 'not a boolean')
                    } else {
                        outputValue = outputValue === 'true'
                    }
                }
                if (outputValue !== true && outputValue !== false) {
                    throw keyFail(key, 'output value not a true or false')
                }
            }
        }
        output[key] = valueType === 'empty' ? def : outputValue
    }
    return Object.freeze(output)
}
