import { Hook } from './hook'
import { expect } from 'chai'

describe('Hook', () => {
    it('base', function(done) {
        let hook = new Hook()
        hook.attach('test', async(data) => {
            expect(data.name).to.equal('dave')
            done()
        })
        hook.notify('test', {
            name: 'dave'
        })
    })
    it('context', function(done) {
        let hook = new Hook()
        hook.attach('test', async(data, context) => {
            if (context.state.count == null) {
                context.state.count = 0
            }
            expect(typeof context.id).to.equal('string')
            context.state.count += 1
            if (context.state.count === 2) {
                done()
            }
        })
        hook.notify('test', {})
        hook.notify('test', {})
    })
    it('emit empty', function() {
        let hook = new Hook()
        let count = 0
        hook.attach('test', async() => {
            count += 1
        })
        hook.notify('test2', {})
        expect(count).to.equal(0)
    })
    it('event off', async function() {
        let count = 0
        let hook = new Hook()
        let listener = hook.attach('test', async() => {
            count += 1
        })
        await hook.notify('test', {})
        await hook.notify('test', {})
        hook.detach('test', listener.id)
        await hook.notify('test', {})
        expect(count).to.equal(2)
    })
    it('event off empty', async function() {
        let hook = new Hook()
        let count = 0
        let listener = hook.attach('test', async() => {
            count += 1
        })
        await hook.notify('test', {})
        await hook.notify('test', {})
        hook.detach('test2', listener.id)
        await hook.notify('test', {})
        expect(count).to.equal(3)
    })
    it('off', async function() {
        let hook = new Hook()
        let count = 0
        let listener = hook.attach('test', async() => {
            count += 1
        })
        await hook.notify('test', {})
        await hook.notify('test', {})
        listener.off()
        await hook.notify('test', {})
        expect(count).to.equal(2)
    })
    it('once', async function() {
        let hook = new Hook()
        let count = 0
        hook.attach('test', async(data, context) => {
            count += 1
            context.off()
        })
        await hook.notify('test', {})
        await hook.notify('test', {})
        await hook.notify('test', {})
        expect(count).to.equal(1)
    })
    it('after', async function() {
        let hook = new Hook()
        let flow: any[] = []
        hook.attachAfter('test', async(data, context) => {
            flow.push(1)
        })
        hook.attach('test', async(data, context) => {
            flow.push(2)
        })
        hook.attach('test', async(data, context) => {
            flow.push(3)
        })
        await hook.notify('test', {})
        expect(flow[0]).to.equal(2)
        expect(flow[1]).to.equal(3)
        expect(flow[2]).to.equal(1)
    })
})
