import { expect } from 'chai'
import { sleep } from '../utils/flow'
import { CacheLite } from './cache-lite'

describe('CacheLite', () => {
    it('get', function() {
        let flag = 0
        let cl = new CacheLite({
            expTime: 100,
            handler: (key) => {
                flag += 1
                return key + '-' + flag
            }
        })
        expect(cl.get()).to.equal('-1')
        expect(cl.get('a')).to.equal('a-2')
        expect(cl.get('b')).to.equal('b-3')
        expect(cl.get('a')).to.equal('a-2')
    })
    it('data', function() {
        let cl = new CacheLite<string>({
            expTime: 100,
            handler: (key, data) => {
                return data || ''
            }
        })
        expect(cl.get('a', '123')).to.equal('123')
    })
    it('remove', function() {
        let flag = 0
        let cl = new CacheLite({
            expTime: 100,
            handler: () => {
                flag += 1
                return flag
            }
        })
        expect(cl.get('a')).to.equal(1)
        expect(cl.get('a')).to.equal(1)
        cl.remove('a')
        cl.remove('b')
        expect(cl.get('a')).to.equal(2)
    })
    it('max', function() {
        let flag = 0
        let cl = new CacheLite({
            expTime: 100,
            maxSize: 3,
            handler: () => {
                flag += 1
                return flag
            }
        })
        expect(cl.get('a')).to.equal(1)
        expect(cl.get('b')).to.equal(2)
        expect(cl.get('c')).to.equal(3)
        expect(cl.get('d')).to.equal(4)
        expect(cl.get('a')).to.equal(5)
    })
    it('exp', async function() {
        let flag = 0
        let cl = new CacheLite({
            expTime: 100,
            handler: (key) => {
                flag += 1
                return key + '-' + flag
            }
        })
        expect(cl.get('a')).to.equal('a-1')
        await sleep(200)
        expect(cl.get('a')).to.equal('a-2')
    })
    it('clear', function() {
        let flag = 0
        let cl = new CacheLite({
            expTime: 100,
            handler: (key) => {
                flag += 1
                return key + '-' + flag
            }
        })
        expect(cl.get('a')).to.equal('a-1')
        expect(cl.get('b')).to.equal('b-2')
        cl.clear()
        expect(cl.get('a')).to.equal('a-3')
    })
    it('gc', async function() {
        let cl = new CacheLite({
            expTime: 100,
            handler: key => key
        })
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
