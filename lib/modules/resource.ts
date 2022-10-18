import { headMatch } from '../utils/text'

type ResourceSupport = string | File | Blob | MediaSource

type ResourceParams = {
    def: (path: string) => string
}

export class Resource {
    private params: ResourceParams
    constructor(params: ResourceParams) {
        this.params = params
    }

    url(source: ResourceSupport) {
        if (typeof source === 'string') {
            let p = source.trim()
            let ori = ['http', 'file', 'data:', '//']
            for (let o of ori) {
                if (headMatch(p, o)) {
                    return p
                }
            }
        }
        if (typeof File !== 'undefined' && source instanceof File) {
            let url = URL.createObjectURL(source)
            return url
        }
        if (typeof Blob !== 'undefined' && source instanceof Blob) {
            let url = URL.createObjectURL(source)
            return url
        }
        if (typeof MediaSource !== 'undefined' && source instanceof MediaSource) {
            let url = URL.createObjectURL(source)
            return url
        }
        return typeof source === 'string' ? this.params.def(source) : ''
    }

    backgroundStyle(source: ResourceSupport) {
        return `background-image: url(${this.url(source)})`
    }
}
