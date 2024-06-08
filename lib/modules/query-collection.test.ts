import { flow } from '../utils/flow'
import { expect } from 'chai'
import { QueryCollection } from './query-collection'

describe('Log', () => {
    it('base', async function() {
        let collection = new QueryCollection({
            waitTime: 10,
            query: async(data) => {
                return data
            }
        })
        let [a, b] = await Promise.all([
            collection.push(1),
            collection.push(2)
        ])
        expect(a).to.equal(b)
        expect(a[0]).to.equal(1)
        expect(a[1]).to.equal(2)
    })
    it('fail', async function() {
        let collection = new QueryCollection({
            waitTime: 10,
            query: async(_data) => {
                throw '123'
            }
        })
        let e = null
        try {
            await collection.push(1)
        } catch (error) {
            e = error
        }
        expect(e).to.equal('123')
    })
    it('keep input', async function() {
        let flag = 0
        let collection = new QueryCollection({
            waitTime: 50,
            query: async(data) => {
                flag += data.length
                await flow.sleep(100)
                return data
            }
        })
        let promises: Promise<any>[] = []
        promises.push(collection.push(1))
        promises.push(collection.push(1))
        await flow.sleep(80)
        promises.push(collection.push(1))
        await Promise.all(promises)
        await flow.sleep(100)
        expect(flag).to.equal(3)
    })
})
