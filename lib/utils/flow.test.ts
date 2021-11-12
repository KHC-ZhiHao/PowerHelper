import { expect } from 'chai'
import { randomInt, randomPick, sleep } from './flow'

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
})
