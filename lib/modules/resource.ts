import { Event } from './event'
import { headMatch } from '../utils/text'

type ResourceSupport = string | File | Blob | MediaSource

type ResourceParams = {
    def: (_path: string) => string
}

type Channels = {
    fetch: {
        url: string
        source: ResourceSupport
        isObjectUrl: boolean
    }
}

export class Resource extends Event<Channels> {
    private objectUrls: string[] = []
    private params: ResourceParams
    constructor(params: ResourceParams) {
        super()
        this.params = params
    }

    private createObjectUrl(source: File | Blob | MediaSource) {
        let url = URL.createObjectURL(source)
        this.objectUrls.push(url)
        return url
    }

    url(source: ResourceSupport) {
        let url = ''
        let isObjectUrl = false
        if (typeof source === 'string') {
            let p = source.trim()
            let ori = ['http', 'file', 'data:', '//']
            for (let o of ori) {
                if (headMatch(p, o)) {
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

    release() {
        this.objectUrls.forEach(url => URL.revokeObjectURL(url))
        this.objectUrls = []
    }

    backgroundStyle(source: ResourceSupport) {
        return `background-image: url(${this.url(source)})`
    }
}
