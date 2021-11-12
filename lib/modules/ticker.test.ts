import { sleep } from '../utils/flow'
import { expect } from 'chai'
import { Ticker } from './ticker'

describe('Ticker', () => {
    it('base', function(done) {
        let ticker = new Ticker(10)
        ticker.on('next', () => {
            done()
            ticker.close()
        })
    })
    it('flow', function(done) {
        let flag = false
        let ticker = new Ticker(10)
        ticker.stop()
        ticker.on('next', () => {
            flag = true
        })
        setTimeout(() => {
            expect(flag).to.equal(false)
            done()
            ticker.close()
        }, 100)
    })
    it('flow play', function(done) {
        let flag = false
        let ticker = new Ticker(10)
        ticker.stop()
        ticker.on('next', () => {
            flag = true
        })
        ticker.play()
        setTimeout(() => {
            expect(flag).to.equal(true)
            done()
            ticker.close()
        }, 100)
    })
    it('auto play', function(done) {
        let flag = false
        let ticker = new Ticker(10, {
            autoPlay: false
        })
        ticker.on('next', () => {
            flag = true
        })
        setTimeout(() => {
            expect(flag).to.equal(false)
            done()
            ticker.close()
        }, 100)
    })
    it('cover', function() {
        let ticker = new Ticker(10, {})
        ticker.close()
    })
})
