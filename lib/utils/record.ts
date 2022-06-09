import { jpjs } from './json'
import { getType } from './pick'
import { PeelPath } from '../types/pick'

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
    let handler = (template: T, target: JsonObject, nowPeel: string = '') => {
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
