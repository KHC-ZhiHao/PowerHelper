import { expect } from 'chai'
import { sleep } from './flow'
import { groups, randomPick, randomPicks, unique, asyncMap, check } from './array'

describe('Array', () => {
    it('group', function() {
        let array = [1, 2, 3, 4, 5, 6]
        let newArray = groups(3, array)
        let json = JSON.stringify(newArray)
        expect(json).to.equal('[[1,2,3],[4,5,6]]')
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
    it('randomPicks', () => {
        expect(randomPicks(2, [1, 2, 3, 4]).length).to.equal(2)
        expect(randomPicks(5, [1, 2, 3, 4]).length).to.equal(4)
    })
    it('unique', () => {
        expect(unique([1, 2, 3, 4, 4]).join()).eq([1, 2, 3, 4].join())
    })
    it('async map', async() => {
        const result = await asyncMap([1, 2, 3, 4], async e => {
            await sleep(10)
            return e + 1
        })
        expect(result.join()).eq([2, 3, 4, 5].join())
    })
    it('check', async() => {
        const result = await check([1, 2, 3, 4], 4)
        expect(result.join()).eq([1, 2, 3].join())
        const result2 = await check([1, 2, 3, 4], 5)
        expect(result2.join()).eq([1, 2, 3, 4, 5].join())
    })
})
