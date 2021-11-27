import { expect } from 'chai'
import { sleep } from '../utils/flow'
import { Cache } from './cache'

function getCache() {
    return new Cache<{ name: string, value: string }, string>({
        key: params => params.name,
        pick: async (params, { key }) => {
            return key + '/' + params.value
        }
    })
}

describe('Cache', () => {
    it('get', async function() {
        let cache = getCache()
        let params = {
            name: '123',
            value: '456'
        }
        expect(await cache.get(params)).to.equal('123/456')
    })
    it('change value', async function() {
        let flag = false
        let cache = new Cache<any, any>({
            key: params => params.name,
            pick: async (params) => {
                return {
                    name: params.name
                }
            }
        })
        let params = {
            name: '123'
        }
        try {
            let result = await cache.get(params)
            result.name = '456'
        } catch (error) {
            flag = true
        }
        expect(flag).to.equal(true)
    })
    it('get by again', async function() {
        let cache = getCache()
        let params = {
            name: '123',
            value: '456'
        }
        let result = await cache.get(params)
        await sleep(100)
        expect(await cache.get(params)).to.equal(result)
    })
    it('get by expired', async function() {
        let cache = new Cache<{ name: string }, string>({
            keepAlive: 1,
            key: params => params.name,
            pick: async (params, { key }) => {
                return key + '/' + Date.now()
            }
        })
        let params = {
            name: '123'
        }
        let result = await cache.get(params)
        await sleep(100)
        expect((await cache.get(params)) === result).to.equal(false)
    })
    it('get by batch get', async function() {
        let count = 0
        let cache = new Cache<{ name: string, value: string }, string>({
            key: params => params.name,
            pick: async (params, { key }) => {
                count += 1
                return key + '/' + params.value
            }
        })
        let params = {
            name: '123',
            value: '456'
        }
        let params2 = {
            name: '124',
            value: '456'
        }
        let result = await Promise.all([
            cache.get(params),
            cache.get(params),
            cache.get(params),
            cache.get(params2),
            cache.get(params2)
        ])
        expect(count).to.equal(2)
        expect(result[0]).to.equal(result[1])
        expect(result[1]).to.equal(result[2])
        expect(result[3]).to.equal(result[4])
        expect(result[0] === result[4]).to.equal(false)
    })
    it('set', async function() {
        let cache = getCache()
        let params = {
            name: '123',
            value: '456'
        }
        let result = await cache.get(params)
        expect(result).to.equal('123/456')
        cache.set(params, 'ouo')
        let newResult = await cache.get(params)
        expect(newResult).to.equal('ouo')
    })
    it('remove', async function() {
        let count = 0
        let cache = new Cache<{ name: string }, number>({
            key: params => params.name,
            pick: async () => {
                count += 1
                return count
            }
        })
        let params = {
            name: '123'
        }
        expect(await cache.get(params)).to.equal(1)
        expect(await cache.get(params)).to.equal(1)
        cache.remove(params)
        expect(await cache.get(params)).to.equal(2)
    })
    it('remove event', async function() {
        let count = 0
        let cache = new Cache<{ name: string }, number>({
            keepAlive: 50,
            key: params => params.name,
            pick: async () => {
                return 10
            }
        })
        let params = {
            name: '123'
        }
        await cache.get(params)
        cache.on('remove', ({ data }) => {
            count += data
        })
        await sleep(100)
        await cache.get({ name: '567' })
        cache.removeExpired()
        expect(count).to.equal(10)
    })
    it('remove empty', async function() {
        let count = 0
        let params = {
            name: '123'
        }
        let params2 = {
            name: '1234'
        }
        let cache = new Cache<{ name: string }, number>({
            key: params => params.name,
            pick: async () => {
                count += 1
                return count
            }
        })
        expect(await cache.get(params)).to.equal(1)
        expect(await cache.get(params)).to.equal(1)
        cache.remove(params2)
        expect(await cache.get(params)).to.equal(1)
    })
    it('clear', async function() {
        let count = 0
        let params = {
            name: '123'
        }
        let params2 = {
            name: '124'
        }
        let cache = new Cache<{ name: string }, number>({
            key: params => params.name,
            pick: async () => {
                count += 1
                return count
            }
        })
        expect(await cache.get(params)).to.equal(1)
        expect(await cache.get(params)).to.equal(1)
        expect(await cache.get(params2)).to.equal(2)
        cache.clear()
        expect(await cache.get(params)).to.equal(3)
        expect(await cache.get(params2)).to.equal(4)
    })
    it('keys', async function() {
        let cache = getCache()
        await cache.get({ name: '123', value: '1' })
        await cache.get({ name: '124', value: '1' })
        await cache.get({ name: '125', value: '1' })
        expect(JSON.stringify(cache.keys())).to.equal('["123","124","125"]')
    })
})
