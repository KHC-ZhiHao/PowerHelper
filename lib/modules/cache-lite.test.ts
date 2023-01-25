import { expect } from 'chai'
import { sleep } from '../utils/flow'
import { CacheLite } from './cache-lite'

describe('CacheLite', () => {
    it('basic', async function() {
        let cl = new CacheLite<string>({
            expTime: 20
        })
        cl.set('a', 'b')
        cl.set('c', 'd')
        expect(cl.get('a')).to.equal('b')
        expect(cl.has('a')).to.equal(true)
        expect(cl.has('b')).to.equal(false)
        expect(cl.values().join()).to.equal('b,d')
        await sleep(50)
        expect(cl.get('a')).to.equal(undefined)
    })
    it('get', function() {
        let flag = 0
        let cl = new CacheLite<string>({
            expTime: 100,
            intercept: {
                set: ({ key }) => {
                    flag += 1
                    return {
                        key,
                        value: key + '-' + flag
                    }
                }
            }
        })
        expect(cl.set('', '')).to.equal('-1')
        expect(cl.set('a', '')).to.equal('a-2')
        expect(cl.set('b', '')).to.equal('b-3')
        expect(cl.set('a', '')).to.equal('a-4')
    })
    it('remove', function() {
        let cl = new CacheLite({
            expTime: 100
        })
        cl.set('a', 2)
        expect(cl.get('a')).to.equal(2)
        cl.remove('a')
        expect(cl.get('a')).to.equal(undefined)
    })
    it('max', function() {
        let cl = new CacheLite({
            expTime: 100,
            maxSize: 3
        })
        cl.set('a', '')
        expect(cl.size).to.equal(1)
        cl.set('b', '')
        expect(cl.size).to.equal(2)
        cl.set('c', '')
        expect(cl.size).to.equal(3)
        cl.set('d', '')
        expect(cl.size).to.equal(3)
        cl.set('a', '')
        expect(cl.size).to.equal(3)
        expect(cl.keys().join()).to.equal('c,d,a')
    })
    it('clear', function() {
        let cl = new CacheLite({
            expTime: 100
        })
        cl.set('a', '1')
        cl.set('b', '2')
        cl.clear()
        expect(cl.get('a')).to.equal(undefined)
        expect(cl.get('b')).to.equal(undefined)
    })
})
