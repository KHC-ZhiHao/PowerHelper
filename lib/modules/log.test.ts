import { expect } from 'chai'
import { Log } from './Log'

describe('Log', () => {
    it('base', function() {
        let log = new Log('new-log')
        log.print('hello')
    })
    it('event', function() {
        let result = null as any as {
            time: string
            name: string
            data: any
            color: string
            message: string
            logType: string
        }
        let log = new Log('new-log')
        log.on('print', ({ data }) => {
            result = data
        })
        log.print('hello', {
            color: 'red'
        })
        expect(result.data).to.equal('hello')
        expect(result.name).to.equal('new-log')
        expect(result.color).to.equal('red')
        expect(result.logType).to.equal('normal')
        expect(typeof result.time).to.equal('string')
    })
    it('silence', function() {
        let log = new Log('new-log')
        log.silence()
        log.print('hello')
    })
    it('default silence', function() {
        let log = new Log('new-log', {
            silence: true
        })
        log.print('hello')
        let log2 = new Log('new-log', {
            silence: false
        })
        log2.silence(false)
        log2.print('hello')
    })
    it('browser', function() {
        // @ts-ignore
        global.window = {}
        let log = new Log('new-log')
        log.print('hello', {
            color: 'red'
        })
        // @ts-ignore
        global.window = undefined
    })
    it('cover', function() {
        new Log('new-log', {})
        let log = new Log('new-log')
        log.print('hello', {})
        log.print('hello', {
            logType: 'normal'
        })
    })
})
