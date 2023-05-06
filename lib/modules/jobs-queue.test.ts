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
})
