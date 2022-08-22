import { expect } from 'chai'
import { Base } from './module-base'

describe('Cache', () => {
    it('cover', function() {
        let base = new Base()
        base.$devWarn('123', '456')
        base.$devWarn('123', true)
        base.$devWarn('123', new Error('123'))
        base.$devWarn('123', {
            name: '123'
        })
    })
    it('base', function(done) {
        let base = new Base()
        try {
            base.$devError('123', '456')
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('456')).to.equal(true)
            done()
        }
    })
    it('Unknown Error', function(done) {
        let base = new Base()
        try {
            base.$devError('123', true)
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('Unknown Error')).to.equal(true)
            done()
        }
    })
    it('Error', function(done) {
        let base = new Base()
        try {
            base.$devError('123', new Error('123'))
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('123')).to.equal(true)
            done()
        }
    })
    it('Object Error', function(done) {
        let base = new Base()
        try {
            base.$devError('123', {
                error: '123'
            })
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('"error": "123"')).to.equal(true)
            done()
        }
    })
    it('Object Unknown Error', function(done) {
        let base = new Base()
        let target: any = {}
        target.target = target
        try {
            base.$devError('123', target)
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('Unknown Error')).to.equal(true)
            done()
        }
    })
})
