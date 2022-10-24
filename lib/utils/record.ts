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
 * 複製指定物件的值到目標 Object 上，並產生一份新的 Object，細部規則可詳見 example。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#setmapvalue
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
 * 建立一組嚴格檢查、轉譯並實質不能變動的 Object，通常應用在環境變數。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md#createstrictobject
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
