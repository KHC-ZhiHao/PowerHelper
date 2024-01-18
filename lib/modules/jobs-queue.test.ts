import { expect } from 'chai'
import { sleep } from '../utils/flow'
import { JobsQueue } from './jobs-queue'

describe('JobsQueue', () => {
    it('base', function(done) {
        let flag = ''
        let jq = new JobsQueue({
            concurrentExecutions: 1
        })
        jq.push('123', async() => {
            await sleep(10)
            flag += '1'
        })
        jq.push('123', async() => {
            await sleep(20)
            flag += '2'
        })
        jq.on('allDone', () => {
            expect(flag).equal('12')
            done()
        })
    })
    it('base and wait', async function() {
        let flag = ''
        let jq = new JobsQueue({
            concurrentExecutions: 1
        })
        jq.push('123', async() => {
            await sleep(10)
            flag += '1'
        })
        jq.push('1234', async() => {
            await sleep(10)
            flag += '2'
        })
        await jq.pushAndWait('1235', async() => {
            await sleep(20)
            flag += '3'
        })
        expect(flag).equal('123')
    })
    it('base and wait close', async function() {
        let flag = ''
        let jq = new JobsQueue({
            concurrentExecutions: 1
        })
        jq.push('123', async() => {
            await sleep(10)
            flag += '1'
        })
        jq.push('1234', async() => {
            await sleep(10)
            flag += '2'
        })
        jq.close()
        await jq.pushAndWait('1235', async() => {
            await sleep(20)
            flag += '3'
        })
        expect(flag).equal('')
    })
    it('base and wait error', async function() {
        let flag = ''
        let jq = new JobsQueue({
            concurrentExecutions: 1
        })
        try {
            await jq.pushAndWait('1235', async() => {
                flag = 'success'
                throw '123'
            })
        } catch (error) {
            flag = 'error'
        }
        expect(flag).equal('error')
    })
    it('unshift', function(done) {
        let flag = ''
        let jq = new JobsQueue({
            concurrentExecutions: 1
        })
        jq.push('123', async() => {
            await sleep(10)
            flag += '1'
        })
        jq.push('123', async() => {
            await sleep(20)
            flag += '2'
        })
        jq.unshift('123', async() => {
            await sleep(20)
            flag += '3'
        })
        jq.on('allDone', () => {
            expect(flag).equal('132')
            done()
        })
    })
    it('Concurrent Executions 2', function(done) {
        let flag = ''
        let jq = new JobsQueue({
            concurrentExecutions: 2
        })
        jq.push('123', async() => {
            await sleep(100)
            flag += '1'
        })
        jq.push('123', async() => {
            await sleep(50)
            flag += '2'
        })
        jq.on('allDone', () => {
            expect(flag).equal('21')
            done()
        })
    })
    it('error', function(done) {
        let jq = new JobsQueue({
            concurrentExecutions: 2
        })
        jq.push('123', async() => {
            throw new Error('123')
        })
        jq.on('error', () => {
            done()
        })
    })
    it('close', async function() {
        let flag = '1'
        let jq = new JobsQueue({
            concurrentExecutions: 1
        })
        jq.close()
        jq.push('123', async() => {
            flag = '2'
        })
        await sleep(200)
        expect(flag).equal('1')
    })
    it('close 2', function(done) {
        let flag = ''
        let jq = new JobsQueue({
            concurrentExecutions: 1
        })
        jq.push('123', async() => {
            await sleep(100)
            flag += '1'
            jq.close()
            setTimeout(() => {
                expect(flag).equal('1')
                done()
            }, 100)
        })
        jq.push('123', async() => {
            await sleep(50)
            flag += '2'
        })
    })
    it('stop and play' , async function() {
        let flag = ''
        let jq = new JobsQueue({
            autoPlay: false,
            concurrentExecutions: 1
        })
        jq.push('123', async() => {
            flag += '1'
            jq.stop()
        })
        jq.push('123', async() => {
            await sleep(50)
            flag += '2'
        })
        jq.play()
        await sleep(100)
        expect(flag).equal('1')
        expect(jq.isStoped).equal(true)
        jq.play()
        expect(jq.isStoped).equal(false)
        await sleep(100)
        expect(flag).equal('12')
    })
})
