import { expect } from 'chai'
import { Event } from './event'

describe('Event', () => {
    it('base', function(done) {
        let event = new Event()
        event.on('test', ({ data }) => {
            expect(data.name).to.equal('dave')
            done()
        })
        event.emit('test', {
            name: 'dave'
        })
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
    it('getChannelListenerSize', function() {
        let event = new Event()
        event.on('test', () => {})
        event.on('test', () => {})
        event.on('test', () => {})
        event.on('test2', () => {})
        expect(event.getChannelListenerSize('test')).to.equal(3)
        expect(event.getChannelListenerSize('test2')).to.equal(1)
        expect(event.getChannelListenerSize('test3')).to.equal(0)
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
        event.once('test', () => {
            count += 1
        })
        event.emit('test', {})
        event.emit('test', {})
        event.emit('test', {})
        expect(count).to.equal(1)
    })
})
