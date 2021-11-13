import { expect } from 'chai'
import { arrayGroups } from './array'

describe('Array', () => {
    it('group', function() {
        let array = [1, 2, 3, 4, 5, 6]
        let newArray = arrayGroups(3, array)
        let json = JSON.stringify(newArray)
        expect(json).to.equal('[[1,2,3],[4,5,6]]')
    })
})
