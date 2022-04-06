import { jpjs } from './json'
import { getType } from './pick'

type JsonObject = string | number | boolean | null | JsonObject[] | {
    [key: string]: JsonObject
}

/**
 * 複製指定物件的值到目標物件上，並產生一份新的物件。
 * @example
 * const template = {
 *     name: 'dave',
 *     age: 18 // data 沒有 age，採用原本的值
 * }
 * const data = {
 *     name: 'james', // 共同有 name 的 key 值，所以複寫 template 的 name
 *     sex: 'M' // template 沒有 sex，忽略
 * }
 * // { name: 'james', age: 18 }
 * console.log(record.setMapValue(template, data))
 */

export const setMapValue = <T extends JsonObject>(template: T, target: JsonObject): T => {
    const output: any = {}
    const s: any = template == null ? {} : jpjs(template)
    const t: any = target == null ? {} : jpjs(target)
    for (let key in s) {
        let type = getType(s[key])
        if (type === 'object') {
            output[key] = setMapValue(s[key], t[key])
            continue
        }
        if (t[key] == null) {
            output[key] = s[key]
        } else {
            output[key] = t[key]
        }
    }
    return output
}
