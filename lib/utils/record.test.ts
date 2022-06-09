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
        expect(data.profile.country.area).to.equal('HK')
    })
    it('empty', async function() {
        let data = setMapValue(null, null)
        expect(JSON.stringify(data)).to.equal('{}')
    })
    it('directReplacePeels', async function() {
        let data = setMapValue({
            d: {
                e: '5'
            },
            c: {
                d: '4'
            }
        }, {
            d: {
                e: '6'
            },
            c: {
                j: '7'
            }
        }, {
            directReplacePeels: ['c']
        })
        // @ts-ignore
        expect(data.c.j).to.equal('7')
    })
})
