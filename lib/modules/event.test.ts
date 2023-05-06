import { expect } from 'chai'
import { Event } from './event'

describe('Event', () => {
    it('base', function(done) {
        let event = new Event()
        event.on('test', (data) => {
            expect(data.name).to.equal('dave')
            done()
        })
        event.emit('test', {
            name: 'dave'
        })
    })
    it('context', function(done) {
        let event = new Event()
        event.on('test', (data, context) => {
            if (context.state.count == null) {
                context.state.count = 0
            }
            expect(typeof context.id).to.equal('string')
            context.state.count += 1
            if (context.state.count === 2) {
                done()
            }
        })
        event.emit('test', {})
        event.emit('test', {})
    })
    it('emit empty', function() {
        let event = new Event()
        let count = 0
        event.on('test', () => {
            count += 1
        })
        event.emit('test2', {})
        expect(count).to.equal(0)
    })
    it('getEventListenerSize', function() {
        let event = new Event()
        event.on('test', () => null)
        event.on('test', () => null)
        event.on('test', () => null)
        event.on('test2', () => null)
        expect(event.getEventListenerSize('test')).to.equal(3)
        expect(event.getEventListenerSize('test2')).to.equal(1)
        expect(event.getEventListenerSize('test3')).to.equal(0)
    })
    it('event off', function() {
        let count = 0
        let event = new Event()
        let listener = event.on('test', () => {
            count += 1
        })
        event.emit('test', {})
        event.emit('test', {})
        event.off('test', listener.id)
        event.emit('test', {})
        expect(count).to.equal(2)
    })
    it('event off empty', function() {
        let count = 0
        let event = new Event()
        let listener = event.on('test', () => {
            count += 1
        })
        event.emit('test', {})
        event.emit('test', {})
        event.off('test2', listener.id)
        event.emit('test', {})
        expect(count).to.equal(3)
    })
    it('off', function() {
        let count = 0
        let event = new Event()
        let listener = event.on('test', () => {
            count += 1
        })
        event.emit('test', {})
        event.emit('test', {})
        listener.off()
        event.emit('test', {})
        expect(count).to.equal(2)
    })
    it('once', function() {
        let count = 0
        let event = new Event()
        event.on('test', (data, context) => {
            count += 1
            context.off()
        })
        event.emit('test', {})
        event.emit('test', {})
        event.emit('test', {})
        expect(count).to.equal(1)
    })
    it('on all', function() {
        let count = 0
        let event = new Event()
        event.on('test', (_data, _context) => {
            count += 1
        })
        event.on('*', (_data, _context) => {
            count += 1
        })
        event.emit('test', {})
        expect(count).to.equal(2)
    })
})
