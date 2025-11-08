import { expect } from 'chai'
import { record } from './record.js'

const { setMapValue, createStrictObject, omit, promiseAllWithKeys, simpleCheckDeepDiff } = record

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
    it('omit', async function() {
        let old = {
            name: '123',
            age: 456,
            year: 777
        }
        let data = omit(old, ['name'])
        // @ts-ignore
        expect(data.name == null).to.equal(true)
        expect(data.age).to.equal(456)
        expect(data.year).to.equal(777)
        expect(old.name).to.equal('123')
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
    it('cover test', function() {
        const template = {
            name: 'dave',
            age: 18,
            parents: ['mother', 'father'],
            cars: {
                bike: {
                    name: 'giant',
                    boughtAt: '2022-01-01'
                },
                scooter: {
                    name: 'gt',
                    boughtAt: '2022-01-02'
                }
            }
        }

        const data = {
            name: 'james',
            sex: 'M',
            parents: ['sister'],
            cars: {
                bike: {
                    name: 'ubike'
                },
                scooter: {
                    name: 'bws',
                    price: 100
                }
            }
        }
        const result = setMapValue(template, data, {
            directReplacePeels: [
                'cars.scooter'
            ]
        })
        expect(result).to.eql({
            name: 'james',
            age: 18,
            parents: ['sister'],
            cars: {
                bike: {
                    name: 'ubike',
                    boughtAt: '2022-01-01'
                },
                scooter: {
                    name: 'bws',
                    price: 100
                }
            }
        })
    })
    it('createStrictObject', function() {
        let flag = false
        let env = createStrictObject({
            isProd: [Boolean, true, 'true'],
            baseUrl: [String, true, 'http://hello'],
            port: [Number, true, '8080'],
            count: [Number, true, 1234],
            isLocal: [Boolean, false, null, false]
        })
        expect(env.isProd).to.equal(true)
        expect(env.isLocal).to.equal(false)
        expect(env.baseUrl).to.equal('http://hello')
        expect(env.port).to.equal(8080)
        expect(env.count).to.equal(1234)
        try {
            // @ts-ignore
            env.isProd = false
        } catch (error) {
            flag = true
        }
        expect(flag).to.equal(true)
    })
    it('createStrictObject Fail', function() {
        let flag = 0
        try {
            createStrictObject({
                isProd: [Boolean, true, '123']
            })
        } catch (error) {
            expect((error as any).message).to.contain('not a boolean')
            flag += 1
        }
        try {
            createStrictObject({
                isProd: [Boolean, true, null]
            })
        } catch (error) {
            expect((error as any).message).to.contain('is required')
            flag += 1
        }
        try {
            createStrictObject({
                isProd: [String, true, 123]
            })
        } catch (error) {
            expect((error as any).message).to.contain('not a string')
            flag += 1
        }
        try {
            createStrictObject({
                isProd: [String, true, '']
            })
        } catch (error) {
            expect((error as any).message).to.contain('no content')
            flag += 1
        }
        try {
            createStrictObject({
                isProd: [Number, true, true]
            })
        } catch (error) {
            expect((error as any).message).to.contain('not a number')
            flag += 1
        }
        try {
            createStrictObject({
                isProd: [Number, true, '12A']
            })
        } catch (error) {
            expect((error as any).message).to.contain('is NaN')
            flag += 1
        }
        try {
            createStrictObject({
                isProd: [Boolean, true, 1234]
            })
        } catch (error) {
            expect((error as any).message).to.contain('output value not a true or false')
            flag += 1
        }
        expect(flag).to.equal(7)
    })
    it('promiseAllWithKeys', async function() {
        let result = await promiseAllWithKeys({
            a: Promise.resolve(1),
            b: Promise.resolve(2),
            c: Promise.resolve(3)
        })
        expect(result.a).to.equal(1)
        expect(result.b).to.equal(2)
        expect(result.c).to.equal(3)
    })
    it('simpleCheckDeepDiff is true', function() {
        let result = simpleCheckDeepDiff({
            a: 1,
            b: 3
        }, {
            a: 1,
            b: 2
        })
        expect(result).to.eql(true)
    })
    it('simpleCheckDeepDiff is true2', function() {
        let result = simpleCheckDeepDiff({
            c: false
        }, {
            c: null
        })
        expect(result).to.eql(true)
    })
    it('simpleCheckDeepDiff is true3', function() {
        let result = simpleCheckDeepDiff({
            c: false,
            d: null
        }, {
            c: false
        })
        expect(result).to.eql(true)
    })
    it('simpleCheckDeepDiff is true4', function() {
        let result = simpleCheckDeepDiff({
            c: ['123']
        }, {
            c: ['123', '456']
        })
        expect(result).to.eql(true)
    })
    it('simpleCheckDeepDiff is true5', function() {
        let result = simpleCheckDeepDiff({
            c: ['123']
        }, {
            c: ['1234']
        })
        expect(result).to.eql(true)
    })
    it('simpleCheckDeepDiff is false', function() {
        let result = simpleCheckDeepDiff({
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: 4
            },
            e: ['123', '456']
        }, {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: 4
            },
            e: ['123', '456']
        })
        expect(result).to.eql(false)
    })
})
