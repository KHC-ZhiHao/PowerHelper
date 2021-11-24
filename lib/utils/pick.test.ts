import { expect } from 'chai'
import { peel } from './pick'

describe('Pick', () => {
    it('peel - 1', async function() {
        const data = {
            a: {
                b: 5
            },
            c: {
                d: {
                    e: true
                }
            }
        }
        expect(peel(data, 'a.b')).to.equal(5)
        expect(peel(data, 'c.d')?.e).to.equal(true)
        expect(peel(data, 'c.d.e')).to.equal(true)
    })
    it('peel - 2', async function() {
        const data = {
            a: {
                b: 5
            }
        }
        // @ts-ignore
        let result = peel(data, 'a.c.d')
        expect(result).to.equal(null)
    })
})
