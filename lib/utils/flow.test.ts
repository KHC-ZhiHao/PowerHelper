import { expect } from 'chai'
import { randomInt, randomPick, sleep, retry, asyncWhile } from './flow'

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
    it('retry int', async() => {
        let now = 0
        retry({
            max: 3,
            interval: 100,
            action: async(index) => {
                now = index
                if (index === 2) {
                    return '123'
                } else {
                    throw ''
                }
            }
        })
        await sleep(10)
        expect(now).to.equal(0)
        await sleep(65)
        expect(now).to.equal(0)
        await sleep(50)
        expect(now).to.equal(1)
        await sleep(100)
        expect(now).to.equal(2)
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
       
    it('async while', async() => {
        let flag = 0
        await asyncWhile(async({ count, doBreak }) => {
            if (count >= 5) {
                return doBreak()
            }
            flag += 1
        })
        expect(flag).to.equal(5)
    })
})
