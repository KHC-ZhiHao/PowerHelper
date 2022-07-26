import { sleep } from '../utils/flow'
import { expect } from 'chai'
import { Schedule } from './schedule'

describe('Schedule', () => {
    it('base', function(done) {
        let schedule = new Schedule()
        schedule.add('test', 100, async() => {
            schedule.close()
            done()
        })
    })
    it('has', function(done) {
        let schedule = new Schedule()
        schedule.add('test', 100, async() => {
            schedule.close()
            done()
        })
        expect(schedule.has('test')).to.equal(true)
        expect(schedule.has('test2')).to.equal(false)
    })
    it('stop', async function() {
        let count = 0
        let schedule = new Schedule()
        schedule.stop()
        schedule.add('test', 1, async() => {
            count += 1
        })
        await sleep(210)
        expect(count).to.equal(0)
        schedule.play()
        await sleep(210)
        let cache = count
        expect(count >= 1).to.equal(true)
        schedule.remove('test')
        await sleep(210)
        expect(count).to.equal(cache)
        schedule.close()
    })
    it('info', async function() {
        let schedule = new Schedule()
        schedule.add('test', 100, async() => {})
        schedule.add('test2', 200, async() => {})
        await sleep(150)
        let result = schedule.info()
        expect(result[0].name).to.equal('test')
        expect(result[0].executedCount).to.equal(1)
        expect(result[1].name).to.equal('test2')
        expect(result[1].executedCount).to.equal(0)
        schedule.close()
    })
    it('wait', async function() {
        let count = 0
        let schedule = new Schedule()
        schedule.add('test', 100, async() => {
            count += 1
            await sleep(110)
        })
        await sleep(210)
        expect(count).to.equal(1)
        schedule.close()
    })
    it('error', async function() {
        let flag = false
        let schedule = new Schedule()
        try {
            schedule.add('test', 100, async() => {})
            schedule.add('test', 100, async() => {})
        } catch (error) {
            flag = true
        }
        expect(flag).to.equal(true)
        schedule.close()
    })
    it('error remove', async function() {
        let flag = false
        let schedule = new Schedule()
        try {
            schedule.remove('test')
        } catch (error) {
            flag = true
        }
        expect(flag).to.equal(true)
        schedule.close()
    })
    it('error in handler', async function() {
        let schedule = new Schedule()
        schedule.add('test', 100, async() => {
            throw new Error('tset')
        })
        await sleep(110)
        schedule.close()
    })
})
