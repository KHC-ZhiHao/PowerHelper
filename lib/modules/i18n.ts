import { Event } from './event.js'
import { text } from '../utils/text.js'
import { VarParameters } from '../types/string.js'

const { replaceVar } = text

type Params<L extends string, K extends string> = {
    def: L
    locales: {
        [key in L]: {
            [key in K]: string
        }
    }
}

type Events = {
    get: {
        key: string
        text: string
        locale: string
        output: string
    }
}

/**
 * 多語系操作系統。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/i18n.md
 */

export class I18n<L extends string, K extends string> extends Event<Events> {
    private params: Params<L, K>
    private nowLocale: L
    constructor(params: Params<L, K>) {
        super()
        this.params = params
        this.nowLocale = params.def
    }

    private get<
        T extends (K | `##${string}`),
        V extends VarParameters<'{', '}', T extends string ? T : ''>
    >(locale: L, key: T, ...vars: V extends Record<string, never> ? any[] : [V]) {
        let text = key as string
        if (text.slice(0, 2) === '##') {
            text = text.slice(2).trim()
        } else {
            // @ts-ignore
            text = (this.params.locales?.[locale]?.[key] || key)
        }
        let output = replaceVar({
            start: '{',
            end: '}',
            text,
            vars: vars[0] || {}
        })
        this.emit('get', {
            key,
            text,
            locale,
            output
        })
        return output
    }

    /** 輸出選定的語系 */

    export(locale: L) {
        return <
            T extends (K | `##${string}`),
            V extends VarParameters<'{', '}', T extends string ? T : ''>
        >(key: T, ...vars: V extends Record<string, never> ? any[] : [V]) => this.get(locale, key, ...vars)
    }

    /** 返回指定鍵值的語系 */

    t<
        T extends (K | `##${string}`),
        V extends VarParameters<'{', '}', T extends string ? T : ''>
    >(key: T, ...vars: V extends Record<string, never> ? any[] : [V]) {
        return this.get(this.nowLocale, key, ...vars)
    }

    /** 設定語系 */

    setLocale(locale: L) {
        this.nowLocale = locale
    }

    /** 獲取當前語系 */

    getLocale() {
        return this.nowLocale
    }

    /**
     * 獲取鍵值來協助延後獲取語系
     * @example
     * i18n.key('user').get('zh')
     * // output: 使用者
     */

    key<
        T extends (K | `##${string}`),
        V extends VarParameters<'{', '}', T extends string ? T : ''>
    >(key: T, ...vars: V extends Record<string, never> ? any[] : [V]) {
        return {
            get: (locale: L) => this.get(locale, key, ...vars)
        }
    }
}
