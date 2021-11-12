import { expect } from 'chai'
import { sleep } from '../utils/flow'
import { Cache } from './cache'

describe('Cache', () => {
    it('get', async function() {
        let cache = new Cache({
            pick: async key => `T:${key}`
        })
        expect(await cache.get('123')).to.equal('T:123')
    })
    it('get by again', async function() {
        let cache = new Cache({
            pick: async key => `T:${key}:${Date.now()}`
        })
        let result = await cache.get('123')
        await sleep(100)
        expect(await cache.get('123')).to.equal(result)
    })
    it('get by expired', async function() {
        let cache = new Cache({
            pick: async key => `T:${key}:${Date.now()}`,
            keepAlive: 1
        })
        let result = await cache.get('123')
        await sleep(100)
        expect((await cache.get('123')) === result).to.equal(false)
    })
    it('get by batch get', async function() {
        let count = 0
        let cache = new Cache({
            pick: async key => {
                count += 1
                return count
            }
        })
        let result = await Promise.all([
            cache.get('123'),
            cache.get('123'),
            cache.get('123'),
            cache.get('124'),
            cache.get('124')
        ])
        expect(count).to.equal(2)
        expect(result[0]).to.equal(result[1])
        expect(result[1]).to.equal(result[2])
        expect(result[3]).to.equal(result[4])
        expect(result[0] === result[4]).to.equal(false)
    })
    it('set', async function() {
        let cache = new Cache({
            pick: async key => `T:${key}`
        })
        let result = await cache.get('123')
        expect(result).to.equal('T:123')
        cache.set('123', 'ouo')
        let newResult = await cache.get('123')
        expect(newResult).to.equal('ouo')
    })
    it('remove', async function() {
        let count = 0
        let cache = new Cache({
            pick: async key => {
                count += 1
                return count
            }
        })
        expect(await cache.get('123')).to.equal(1)
        expect(await cache.get('123')).to.equal(1)
        cache.remove('123')
        expect(await cache.get('123')).to.equal(2)
    })
    it('remove empty', async function() {
        let count = 0
        let cache = new Cache({
            pick: async key => {
                count += 1
                return count
            }
        })
        expect(await cache.get('123')).to.equal(1)
        expect(await cache.get('123')).to.equal(1)
        cache.remove('124')
        expect(await cache.get('123')).to.equal(1)
    })
    it('clear', async function() {
        let count = 0
        let cache = new Cache({
            pick: async key => {
                count += 1
                return count
            }
        })
        expect(await cache.get('123')).to.equal(1)
        expect(await cache.get('123')).to.equal(1)
        expect(await cache.get('124')).to.equal(2)
        cache.clear()
        expect(await cache.get('123')).to.equal(3)
        expect(await cache.get('124')).to.equal(4)
    })
    it('keys', async function() {
        let cache = new Cache({
            pick: async key => key
        })
        await cache.get('123')
        await cache.get('124')
        await cache.get('125')
        expect(JSON.stringify(cache.keys())).to.equal('["123","124","125"]')
    })
})
