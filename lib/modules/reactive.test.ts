import { expect } from 'chai'
import { Reactive } from './reactive.js'
import { flow } from '../utils/flow.js'

const { sleep } = flow

describe('Reactive', () => {
    it('base', function(done) {
        type S = {
            name: string
        }
        let state: S = {
            name: '123'
        }
        let reactive = new Reactive<S>({
            action: async({ state, close, newKey, oldKey }) => {
                expect(state.name).to.equal('123')
                expect(newKey).to.equal('123ouo')
                expect(oldKey).to.equal(null)
                close()
                done()
            },
            observable: async(state) => {
                return state.name + 'ouo'
            }
        })
        reactive.from(state)
    })
    it('change', async function() {
        type S = {
            name: string
        }
        let count = 0
        let state: S = {
            name: '123'
        }
        let reactive = new Reactive<S>({
            schedule: 1,
            action: async() => {
                count += 1
            },
            observable: async(state) => {
                return state.name + 'ouo'
            }
        })
        expect(reactive.isActive()).to.equal(false)
        await reactive.from(state)
        state.name = '1234'
        await sleep(100)
        state.name = '12345'
        await sleep(200)
        reactive.close()
        expect(count).to.equal(3)
        expect(reactive.isActive()).to.equal(true)
    })
    it('double from', async function() {
        type S = {
            name: string
        }
        let flag: any = null
        let reactive = new Reactive<S>({
            schedule: 10000,
            action: async({ state }) => {
                flag = state.name
            },
            observable: async(state) => {
                return state.name + 'ouo'
            }
        })
        reactive.close()
        await reactive.from({
            name: '123'
        })
        await reactive.from({
            name: '1234'
        })
        expect(flag).to.equal('1234')
    })
    it('next', function(done) {
        type S = {
            name: string
        }
        let state: S = {
            name: '123'
        }
        let reactive = new Reactive<S>({
            action: async({ state, close, newKey, oldKey }) => {
                expect(state.name).to.equal('123')
                expect(newKey).to.equal('123ouo')
                expect(oldKey).to.equal(null)
                close()
            },
            observable: async(state) => {
                return state.name + 'ouo'
            }
        })
        reactive.from(state)
        reactive.nextTick((state) => {
            expect(state.name).to.equal('123')
            done()
        })
    })
})
