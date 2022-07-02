import { expect } from 'chai'
import { sleep } from '../utils/flow'
import { CacheLite } from './cache-lite'

describe('CacheLite', () => {
    it('get', function() {
        let flag = 0
        let cl = new CacheLite(100, (key) => {
            flag += 1
            return key + '-' + flag
        })
        expect(cl.get()).to.equal('-1')
        expect(cl.get('a')).to.equal('a-2')
        expect(cl.get('b')).to.equal('b-3')
        expect(cl.get('a')).to.equal('a-2')
    })
    it('exp', async function() {
        let flag = 0
        let cl = new CacheLite(100, (key) => {
            flag += 1
            return key + '-' + flag
        })
        expect(cl.get('a')).to.equal('a-1')
        await sleep(200)
        expect(cl.get('a')).to.equal('a-2')
    })
    it('clear', function() {
        let flag = 0
        let cl = new CacheLite(100, (key) => {
            flag += 1
            return key + '-' + flag
        })
        expect(cl.get('a')).to.equal('a-1')
        expect(cl.get('b')).to.equal('b-2')
        cl.clear()
        expect(cl.get('a')).to.equal('a-3')
    })
    it('gc', async function() {
        let cl = new CacheLite(100, key => key)
        cl.get('a')
        cl.get('b')
        cl.get('c')
        expect(cl.getSize()).to.equal(3)
        await sleep(60)
        cl.get('c')
        cl.get('d')
        await sleep(60)
        cl.get('e')
        expect(cl.getSize()).to.equal(2)
    })
})
