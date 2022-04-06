import { expect } from 'chai'
import { setMapValue } from './record'

describe('Record', () => {
    it('basic', async function() {
        let s = {
            name: 'dave',
            age: 18,
            profile: {
                test: 10,
                address: '123',
                country: {
                    area: 'HK'
                }
            }
        }
        let t = {
            name: 'james',
            sex: 'F',
            profile: {
                test: null,
                address: '456',
                country: {
                    load: 'min'
                }
            }
        }
        let data = setMapValue(s, t)
        expect(data.name).to.equal('james')
        expect(data.age).to.equal(18)
        // @ts-ignore
        expect(data.sex).to.equal(undefined)
    })
    it('empty', async function() {
        let data = setMapValue(null, null)
        expect(JSON.stringify(data)).to.equal('{}')
    })
})
