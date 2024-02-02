import { expect } from 'chai'
import { flow } from '../utils/flow'
import { Debounce } from './debounce'

const { sleep } = flow

describe('Debounce', () => {
    it('base', function(done) {
        let debounce = new Debounce<string>({
            delay: 10
        })
        debounce.on('trigger', ({ values }) => {
            expect(values[0]).to.equal('1')
            expect(values[1]).to.equal('2')
            expect(values[2]).to.equal('3')
            done()
        })
        sleep(10)
            .then(() => {
                debounce.input('1')
                return sleep(10)
            })
            .then(() => {
                debounce.input('2')
                return sleep(10)
            })
            .then(() => {
                debounce.input('3')
            })
    })
    it('stop', async function() {
        let flag = false
        let debounce = new Debounce<string>({
            delay: 10
        })
        debounce.on('trigger', () => {
            flag = true
        })
        debounce.input('1')
        debounce.close()
        await sleep(100)
        expect(flag).to.equal(false)
    })
    it('totalDuration', async function() {
        let flag: any = null
        let debounce = new Debounce<string>({
            delay: 6,
            totalDuration: 18
        })
        debounce.on('trigger', ({ values }) => {
            flag = values.length
        })
        for (let i = 0; i < 30; i++) {
            await sleep(3)
            debounce.input(i.toString())
        }
        expect(flag < 29).to.equal(true)
    })
    it('max', async function() {
        let flag: any = null
        let debounce = new Debounce<string>({
            delay: 6,
            maxValueLength: 5
        })
        debounce.on('trigger', ({ values }) => {
            if (flag == null) {
                flag = values.length
            }
        })
        for (let i = 0; i < 10; i++) {
            await sleep(3)
            debounce.input(i.toString())
        }
        expect(flag).to.equal(5)
    })
    it('tigger', async function() {
        let flag: any = null
        let debounce = new Debounce<string>({
            delay: 10
        })
        debounce.on('trigger', ({ values }) => {
            if (flag == null) {
                flag = values.length
            }
        })
        debounce.input('1')
        debounce.input('2')
        debounce.trigger()
        debounce.input('3')
        expect(flag).to.equal(2)
    })
    it('cover', async function() {
        let debounce = new Debounce<string>({
            delay: 10
        })
        debounce.trigger()
        debounce.close()
    })
    it('cover', async function() {
        let flag = 0
        let debounce = new Debounce<string>({
            delay: 10
        })
        debounce.on('input', () => {
            flag++
        })
        debounce.input('')
        debounce.close()
        expect(flag).to.equal(1)
    })
})
