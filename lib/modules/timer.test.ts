import { sleep } from '../utils/flow'
import { expect } from 'chai'
import { Timer } from './timer'

describe('Time', () => {
    it('base', async function() {
        let timer = new Timer()
        timer.play()
        await sleep(100)
        timer.close()
        expect(timer.getTime() > 0).to.equal(true)
    })
    it('event', function(done) {
        let timer = new Timer()
        timer.play()
        timer.on('next', () => {
            done()
            timer.close()
        })
    })
    it('status', async function() {
        let timer = new Timer()
        timer.setTime(4786 * 1002)
        expect(timer.getHours().toFixed(2)).to.equal('1.33')
        expect(timer.getMicroseconds().toFixed(2)).to.equal('572.00')
        expect(timer.getSeconds().toFixed(2)).to.equal('55.57')
        expect(timer.getMinutes().toFixed(2)).to.equal('19.93')
        expect(timer.getTimeString()).to.equal('01:19:55.57')
        expect(timer.getTimeString('hh-mm-ss-ff')).to.equal('01-19-55-57')
        timer.close()
    })
    it('positive', async function() {
        let timer = new Timer()
        timer.setTime(1000)
        timer.setPositive(false)
        timer.play()
        await sleep(100)
        expect(timer.getTime() <= 1000).to.equal(true)
        timer.close()
    })
    it('computed time', async function() {
        let timer = new Timer()
        timer.setTime(0)
        timer.addTime(4786 * 1002)
        expect(timer.getTimeString('hh-mm-ss-ff')).to.equal('01-19-55-57')
        timer.subtractTime(4786 * 1002)
        expect(timer.getTimeString('hh-mm-ss-ff')).to.equal('00-00-00-00')
        timer.close()
    })
})
