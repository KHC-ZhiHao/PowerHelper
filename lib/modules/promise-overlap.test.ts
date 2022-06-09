import { expect } from 'chai'
import { PromiseOverlap } from './promise-overlap'

describe('PromiseOverlap', () => {
    it('first', async function() {
        let count = 0
        let add = async() => {
            count += 1
            return count
        }
        let promiseOverlap = new PromiseOverlap('first')
        let [r1, r2, r3] = await Promise.all([
            promiseOverlap.run(add),
            promiseOverlap.run(add),
            promiseOverlap.run(add)
        ])
        expect(r1).to.equal(1)
        expect(r2).to.equal(1)
        expect(r3).to.equal(1)
    })
    it('last', async function() {
        let count = 0
        let add = async() => {
            count += 1
            return count
        }
        let promiseOverlap = new PromiseOverlap('last')
        let [r1, r2, r3] = await Promise.all([
            promiseOverlap.run(add),
            promiseOverlap.run(add),
            promiseOverlap.run(add)
        ])
        expect(r1).to.equal(3)
        expect(r2).to.equal(3)
        expect(r3).to.equal(3)
    })
    it('error', async function() {
        let count = 0
        let add = async() => {
            count += 1
            if (count === 3) {
                throw '123'
            }
            return count
        }
        let promiseOverlap = new PromiseOverlap('last', {
            delay: 10
        })
        // @ts-ignore
        let [r1, r2, r3] = await Promise.allSettled([
            promiseOverlap.run(add),
            promiseOverlap.run(add),
            promiseOverlap.run(add)
        ])
        expect(r1.status).to.equal('rejected')
        expect(r2.status).to.equal('rejected')
        expect(r3.status).to.equal('rejected')
    })
})
