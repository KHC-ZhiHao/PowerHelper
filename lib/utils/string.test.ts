import { expect } from 'chai'
import { byteLength } from './string'

describe('String', () => {
    it('byteLength', async function() {
        expect(byteLength('א')).to.equal(2)
        expect(byteLength('a c')).to.equal(3)
        expect(byteLength('測試')).to.equal(6)
        expect(byteLength('😀')).to.equal(4)
    })
})
