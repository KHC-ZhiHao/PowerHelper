import { expect } from 'chai'
import { calc } from './calc'

const { toMs } = calc

describe('Calc', () => {
    it('to ms', function() {
        expect(toMs('s', 2)).eq(2000)
        expect(toMs('m', 2)).eq(120000)
        expect(toMs('h', 2)).eq(7200000)
        expect(toMs('d', 2)).eq(172800000)
        expect(toMs('y', 2)).eq(63115200000)
    })
})
