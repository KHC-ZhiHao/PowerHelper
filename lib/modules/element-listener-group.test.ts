import { expect } from 'chai'
import { JSDOM } from 'jsdom'
import { ElementListenerGroup } from './element-listener-group'
describe('Event', () => {
    it('base', function(done) {
        let dom = new JSDOM()
        let document = dom.window.document.body
        let group = new ElementListenerGroup(document)
        group.add('click', () => {
            done()
        })
        document.click()
    })
    it('off', function() {
        let flag = false
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        group.add('click', () => {
            flag = true
        }).off()
        body.click()
        expect(flag).to.equal(false)
    })
})
