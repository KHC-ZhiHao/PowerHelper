import { Event } from './event'
import { text } from '../utils/text'
import { StyleString } from './style-string'

type Items = Record<string, (data: any) => string>

type ResourceSupport = string | File | Blob | MediaSource

type ResourceParams<I extends Items> = {
    def: (_path: string) => string
    items?: I
}

type Events = {
    fetch: {
        url: string
        source: ResourceSupport
        isObjectUrl: boolean
    }
}

// TODO: 需要新的 guide module 來控制前綴與導向
// private base
// private alias: Map<string, string> = new Map()
// private redirects: Map<string, string> = new Map()

/**
 * 優雅的實現獲取檔案路徑。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/resource.md
 */

export class Resource<I extends Items> extends Event<Events> {
    private objectUrls: string[] = []
    private params: ResourceParams<I>
    constructor(params: ResourceParams<I>) {
        super()
        this.params = params
    }

    private createObjectUrl(source: File | Blob | MediaSource) {
        let url = URL.createObjectURL(source)
        this.objectUrls.push(url)
        return url
    }

    /** 獲取已編寫好案例的 items 資源，回傳的字串是經過 url 編譯後的結果 */
    get<T extends keyof I>(name: T, ...data: Parameters<I[T]>[0] extends undefined ? [] : [Parameters<I[T]>[0]]): string {
        return this.url(this.params.items?.[name]?.(data[0]) || '')
    }

    /** 獲取資源 url */
    url(source: ResourceSupport) {
        let url = ''
        let isObjectUrl = false
        if (typeof source === 'string') {
            let p = source.trim()
            let ori = ['http', 'file', 'data:', '//']
            for (let o of ori) {
                if (text.headMatch(p, o)) {
                    url = p
                    break
                }
            }
        } else if (typeof File !== 'undefined' && source instanceof File) {
            url = this.createObjectUrl(source)
            isObjectUrl = true
        } else if (typeof Blob !== 'undefined' && source instanceof Blob) {
            url = this.createObjectUrl(source)
            isObjectUrl = true
        } else if (typeof MediaSource !== 'undefined' && source instanceof MediaSource) {
            url = this.createObjectUrl(source)
            isObjectUrl = true
        }
        if (url.trim() === '') {
            url = typeof source === 'string' ? this.params.def(source) : ''
        }
        this.emit('fetch', {
            url,
            source,
            isObjectUrl
        })
        return url
    }

    /** 如果取用過 File, Blob, MediaSource 等型態的 Url，需要釋放現有的記憶體資源 */
    release() {
        this.objectUrls.forEach(url => URL.revokeObjectURL(url))
        this.objectUrls = []
    }

    /** 將 url 轉換成 css style，當 mode 為 cover 的時候會協助加入其他背景屬性  */
    backgroundStyle(source: ResourceSupport, mode: 'basic' | 'cover' = 'basic') {
        const ss = new StyleString()
        ss.set('backgroundImage', `url(${this.url(source)})`)
        if (mode === 'cover') {
            ss.set('backgroundSize', 'cover')
            ss.set('backgroundRepeat', 'no-repeat')
            ss.set('backgroundPosition', 'center')
        }
        return ss.join()
    }
}
