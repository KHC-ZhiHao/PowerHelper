import { expect } from 'chai'
import { Exception } from './exception'

describe('Exception', () => {
    it('base', function() {
        let exception = new Exception('test')
        expect(exception.create('ouo').message).to.equal('test: ouo')
        let child = exception.checkout('test2')
        expect(child.create('ouo').message).to.equal('test/test2: ouo')
    })
    it('default error', function() {
        let exception = new Exception('test', {
            defaultError: () => 'XD'
        })
        expect(exception.parseMessage(null)).to.equal('XD')
        let defException = new Exception('test')
        expect(defException.parseMessage(null)).to.equal('Error!')
    })
    it('parse message', function() {
        let exception = new Exception('test', {
            parseMessage: (error) => {
                return error.text
            }
        })
        expect(exception.create({
            text: 'ouo...'
        }).message).to.equal('test: ouo...')
    })
    it('basic parse message', function() {
        let exception = new Exception('test', {
            parseMessage: Exception.basicMessageParser
        })
        expect(exception.create('ouob').message).to.equal('test: ouob')
        expect(exception.create({
            name: 'AxiosError',
            response: {
                data: 'QQ'
            }
        }).message).to.equal('test: QQ')
        expect(exception.create({
            name: 'AxiosError',
            response: {
                data: {
                    error: 'AA'
                }
            }
        }).message).to.equal('test: AA')
        expect(exception.create({
            message: '1234'
        }).message).to.equal('test: 1234')
        expect(exception.create({
            sas: '1234'
        }).message).to.equal('test: Error!')
        expect(exception.create({
            name: 'AxiosError'
        }).message).to.equal('test: Error!')
        expect(exception.create({
            message: 456
        }).message).to.equal('test: Error!')
        expect(exception.create({
            name: 'AxiosError',
            response: {
                data: {
                    error: 12344
                }
            }
        }).message).to.equal('test: Error!')
    })
})
