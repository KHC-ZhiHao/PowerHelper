import { expect } from 'chai'
import { Resource } from './resource'

const mock = (cb: (resource: Resource<any>) => void) => {
    let bk = global.URL
    // @ts-ignore
    global.URL = {
        createObjectURL: () => 'ouo',
        revokeObjectURL: () => null
    }
    let resource = new Resource({
        def: (path) => path
    })
    cb(resource)
    // @ts-ignore
    global.URL = bk
}

describe('Resource', () => {
    it('base', function() {
        let resource = new Resource({
            def: (path) => `images/${path}`
        })
        // @ts-ignore
        expect(resource.url(true)).eq('')
        expect(resource.url('banana.jpg')).eq('images/banana.jpg')
        expect(resource.url('//banana.jpg')).eq('//banana.jpg')
        expect(resource.url('file://banana.jpg')).eq('file://banana.jpg')
        expect(resource.url('https://banana.jpg')).eq('https://banana.jpg')
        expect(resource.url('data://banana.jpg')).eq('data://banana.jpg')
    })
    it('items', function() {
        let resource = new Resource({
            def: (path) => `images/${path}`,
            items: {
                logo: (data: 'google' | 'apple') => {
                    return data === 'google' ? 'google.png' : 'apple.png'
                },
                logo2: () => {
                    return 'apple.png'
                }
            }
        })
        // @ts-ignore
        expect(resource.get('...', {})).eq('images/')
        expect(resource.get('logo', 'google')).eq('images/google.png')
        expect(resource.get('logo2')).eq('images/apple.png')
    })
    it('file', function() {
        mock(resource => {
            // @ts-ignore
            global.File = class {}
            // @ts-ignore
            expect(resource.url(new File())).eq('ouo')
            // @ts-ignore
            global.File = undefined
        })
    })
    it('blob', function() {
        mock(resource => {
            // @ts-ignore
            global.Blob = class {}
            expect(resource.url(new Blob())).eq('ouo')
            // @ts-ignore
            global.Blob = undefined
        })
    })
    it('mediaSource', function() {
        mock(resource => {
            // @ts-ignore
            global.MediaSource = class {}
            expect(resource.url(new MediaSource())).eq('ouo')
            // @ts-ignore
            global.MediaSource = undefined
        })
    })
    it('bg', function() {
        let resource = new Resource({
            def: (path) => `images/${path}`
        })
        expect(resource.backgroundStyle('banana.jpg')).eq('background-image:url(images/banana.jpg)')
    })
    it('blob', function() {
        mock(resource => {
            // @ts-ignore
            global.Blob = class {}
            resource.url(new Blob())
            // @ts-ignore
            expect(resource.objectUrls.length).eq(1)
            resource.release()
            // @ts-ignore
            expect(resource.objectUrls.length).eq(0)
            // @ts-ignore
            global.Blob = undefined
        })
    })

    it('style cover', function() {
        let resource = new Resource({
            def: (path) => `images/${path}`
        })
        expect(resource.backgroundStyle('banana.jpg', 'cover')).eq('background-image:url(images/banana.jpg);background-size:cover;background-repeat:no-repeat;background-position:center')
    })
})
