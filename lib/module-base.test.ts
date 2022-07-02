import { expect } from 'chai'
import { Base } from './module-base'

describe('Cache', () => {
    it('base', async function(done) {
        let base = new Base()
        try {
            base.$devError('123', '456')
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('456')).to.equal(true)
            done()
        }
    })
    it('Unknown Error', async function(done) {
        let base = new Base()
        try {
            base.$devError('123', true)
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('Unknown Error')).to.equal(true)
            done()
        }
    })
    it('Error', async function(done) {
        let base = new Base()
        try {
            base.$devError('123', new Error('123'))
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('123')).to.equal(true)
            done()
        }
    })
    it('Object Error', async function(done) {
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
    it('Object Unknown Error', async function(done) {
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
