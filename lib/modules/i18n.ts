import { Event } from './event'
import { replaceVar } from '../utils/text'
import { VarParameters } from '../types/string'

type Params<L extends string, K extends string> = {
    locales: {
        [key in L]: {
            [key in K]: string
        }
    }
}

type Channels = {
    get: {
        key: string
        text: string
        locale: string
        output: string
    }
}

export class I18n<L extends string, K extends string> extends Event<Channels> {
    params: Params<L, K>
    constructor(params: Params<L, K>) {
        super()
        this.params = params
    }

    /** 輸出選定的語系 */

    export(locale: L) {
        return <
            T extends (K | `##${string}`),
            V extends VarParameters<'{', '}', T extends string ? T : ''>
        >(
            key: T,
            ...vars: V extends Record<string, never> ? any[] : [V]
        ) => {
            let text = key as string
            if (text.slice(0, 2) === '##') {
                text = text.slice(2).trim()
            } else {
                // @ts-ignore
                text = (this.params.locales[locale][key] || key)
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
    }
}
