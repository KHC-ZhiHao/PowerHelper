import { expect } from 'chai'
import { randomInt, randomPick, sleep, retry } from './flow'

describe('Flow', () => {
    it('sleep', async function() {
        let now = Date.now()
        await sleep(350)
        let diff = Date.now() - now
        expect(diff >= 300).to.equal(true)
    })
    it('random pick', async function() {
        let data = randomPick([
            {
                name: 'dave'
            },
            {
                name: 'john'
            }
        ])
        expect(data.name).to.match(/dave|john/)
    })
    it('random int', async function() {
        let num = randomInt(10, 20)
        expect(num >= 10).to.equal(true)
        expect(num <= 20).to.equal(true)
    })
    it('retry', async() => {
        let result = await retry({
            action: async() => {
                return 1
            }
        })
        expect(result).to.equal(1)
    })
    it('retry with fail', async() => {
        let failCount = 0
        let result = await retry({
            max: 3,
            onFail: () => failCount += 1,
            action: async(index) => {
                if (index === 2) {
                    return 777
                } else {
                    throw 'ouo'
                }
            }
        })
        expect(failCount).to.equal(2)
        expect(result).to.equal(777)
    })
    
    it('retry total fail', async() => {
        try {
            await retry({
                max: 3,
                action: async(index) => {
                    throw 'ouo'
                }
            })
        } catch (error) {
            // @ts-ignore
            expect(error.length).to.equal(3)
        }
    })
})
