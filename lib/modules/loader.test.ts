import { Loader } from './loader'
import { expect } from 'chai'
import { sleep } from '../utils/flow'

describe('Loader', () => {
    it('base', async function() {
        let loader = new Loader<{ name: string }>()
        loader.push('test', async({ name }) => {
            await sleep(100)
            return {
                name
            }
        })
        let result = await loader.start({
            name: '123'
        })
        expect(result[0].name).to.equal('test')
        expect(result[0].result.name).to.equal('123')
    })
    it('status', function(done) {
        let loader = new Loader<{ name: string }>()
        expect(loader.called).to.equal(false)
        expect(loader.loading).to.equal(false)
        expect(loader.size).to.equal(0)
        expect(loader.done).to.equal(false)
        expect(loader.complete).to.equal(0)
        expect(loader.fail).to.equal(null)
        loader.push('test', async({ name }) => {
            await sleep(10)
            return {
                name
            }
        })
        loader.push('test2', async({ name }) => {
            await sleep(10)
            return {
                name
            }
        })
        loader.on('done', () => {
            expect(loader.called).to.equal(true)
            expect(loader.loading).to.equal(false)
            expect(loader.size).to.equal(2)
            expect(loader.complete).to.equal(2)
            expect(loader.fail).to.equal(null)
            expect(loader.done).to.equal(true)
            done()
        })
        loader.start({
            name: '123'
        })
        expect(loader.called).to.equal(true)
        expect(loader.loading).to.equal(true)
        expect(loader.size).to.equal(2)
        expect(loader.complete).to.equal(0)
        expect(loader.fail).to.equal(null)
    })
    it('fail', async function() {
        let flag: any = null
        let loader = new Loader<{ name: string }>()
        expect(loader.fail).to.equal(null)
        loader.push('test', async() => {
            throw '123'
        })
        loader.on('fail', ({ error }) => {
            flag = error
        })
        try {
            await loader.start({
                name: '123'
            })
        } catch (error) {
            let fail = loader.fail as any
            expect(fail.isPowerHelperLoader).to.equal(true)
            expect(fail.name).to.equal('test')
            expect(fail.error).to.equal('123')
        }
        expect(flag.name).to.equal('test')
    })
    it('fail-called', function(done) {
        let loader = new Loader<{ name: string }>()
        try {
            loader.start({
                name: '123'
            })
            loader.start({
                name: '123'
            })
        } catch (error) {
            done()
        }
    })
    it('fail-same-name', function(done) {
        let loader = new Loader<{ name: string }>()
        try {
            loader.push('a', async() => {})
            loader.push('a', async() => {})
        } catch (error) {
            done()
        }
    })
})
