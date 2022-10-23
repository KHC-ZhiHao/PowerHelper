import { expect } from 'chai'
import { devError } from './base'

describe('Base', () => {
    it('base', function(done) {
        try {
            devError('123', '456')
        } catch(e) {
            let meg = (e as any).message as string
            expect(!!meg.match('456')).to.equal(true)
            done()
        }
    })
})
