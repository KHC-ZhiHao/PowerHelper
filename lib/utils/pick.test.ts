import { expect } from 'chai'
import { pick } from './pick.js'

const { peel, ifEmpty, ifBad, getType, vars } = pick

describe('Pick', () => {
    it('ifBad', async function() {
        expect(ifBad(5, 10)).to.equal(5)
        expect(ifBad(null, 10)).to.equal(10)
        expect(ifBad(NaN, 10)).to.equal(10)
        expect(ifBad(new Error('123'), 10)).to.equal(10)
    })
    it('ifEmpty', async function() {
        expect(ifEmpty(5, 10)).to.equal(5)
        expect(ifEmpty(null, 10)).to.equal(10)
    })
    it('getType', async function() {
        expect(getType('')).to.equal('string')
        expect(getType(null)).to.equal('empty')
        expect(getType([])).to.equal('array')
        expect(getType(Number('ouo'))).to.equal('NaN')
        expect(getType(/123/)).to.equal('regexp')
        expect(getType(new Promise(() => null))).to.equal('promise')
        expect(getType(Buffer.from([]))).to.equal('buffer')
        expect(getType(new Error())).to.equal('error')
    })
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
        // @ts-ignore
        expect(peel(data, 'c.d.e.f')).to.equal(null)
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
    it('pickVar', async function() {
        let result = vars({
            start: '{',
            end: '}',
            text: '你好我是 {name}，目前是 {job}。'
        })
        expect(result[0]).to.equal('name')
        expect(result[1]).to.equal('job')
    })
    it('pickVar-nodata', async function() {
        let result = vars({
            start: '{',
            end: '}',
            text: '你好我是。'
        })
        expect(result[0]).to.equal(undefined)
    })
})
