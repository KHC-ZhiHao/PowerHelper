import { expect } from 'chai'
import { groups, randomPick, randomPicks } from './array'

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
})
