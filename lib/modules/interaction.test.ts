import { expect } from 'chai'
import { Interaction } from './interaction'

describe('Interaction', () => {
    it('base', function() {
        let setp: any = null
        let interaction = new Interaction({
            name: 'root',
            interceptorMessage: (message) => message
        })
        interaction.on('action', s => {
            setp = s
        })
        interaction.notify('danger', '@_@')
        expect(setp.type).eq('notify')
        expect(setp.level).eq('danger')
        expect(setp.message).eq('@_@')
        interaction.step('123', '@_@')
        expect(setp.type).eq('step')
        expect(setp.level).eq('info')
        expect(setp.message).eq('123')
        expect(setp.meta).eq('@_@')
    })
    it('child', function() {
        let flag: any = null
        let interaction = new Interaction({
            name: 'root',
            interceptorMessage: (message) => message
        })
        interaction.on('action', s => {
            flag = s
        })
        let child = interaction.checkout('1234')
        child.wrong('danger')
        expect(flag.type).eq('wrong')
        expect(flag.checkoutAt).eq('root/1234')
    })
    it('fail', function() {
        let flag: any = null
        let interaction = new Interaction({
            name: 'root',
            interceptorMessage: (message) => message
        })
        interaction.on('action', s => {
            flag = s
        })
        interaction.fail('1234', new Error('123'))
        expect(flag.type).eq('fail')
        expect(flag.meta.message).eq('123')
    })
    it('fail def', function() {
        let flag: any = null
        let interaction = new Interaction({
            name: 'root',
            interceptorMessage: (message) => message
        })
        interaction.on('action', s => {
            flag = s
        })
        interaction.fail('1234')
        expect(flag.type).eq('fail')
        expect(flag.meta).eq('1234')
    })
    it('max size', function() {
        let messages: string[] = []
        let interaction = new Interaction({
            name: 'root',
            stepMaxSize: 3,
            interceptorMessage: (message) => message
        })
        interaction.step('1')
        interaction.step('2')
        interaction.step('3')
        interaction.step('4')
        interaction.step('5')
        interaction.each(step => {
            messages.push(step.message)
        })
        expect(messages.join()).eq('3,4,5')
    })
    it('get flow text', function() {
        let interaction = new Interaction({
            name: 'root'
        })
        interaction.step('1')
        interaction.step('2')
        interaction.step('3')
        interaction.step('4')
        expect(interaction.getFlowText()).eq('3->4')
        expect(interaction.getFlowText(3)).eq('2->3->4')
    })
})
