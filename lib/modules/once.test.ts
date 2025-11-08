import { Once } from './once.js'
import { expect } from 'chai'

describe('Once', () => {
    it('base', async function() {
        let flag = 0
        let log = new Once({
            handler: async() => {
                flag += 1
            }
        })
        await Promise.all([
            log.run(),
            log.run(),
            log.run()
        ])
        await log.run()
        await log.run()
        expect(flag).to.equal(1)
    })
    it('reset', async function() {
        let flag = 0
        let log = new Once({
            handler: async() => {
                flag += 1
            }
        })
        await Promise.all([
            log.run(),
            log.run(),
            log.run()
        ])
        log.reset()
        await Promise.all([
            log.run(),
            log.run(),
            log.run()
        ])
        expect(flag).to.equal(2)
    })
    it('error', async function() {
        let flag = 0
        let log = new Once({
            handler: async() => {
                throw '123'
            }
        })
        try {
            await log.run()
        } catch (error) {
            flag += 1
        }
        try {
            await log.run()
        } catch (error) {
            flag += 1
        }
        expect(flag).to.equal(2)
    })
})
