import { expect } from 'chai'
import { JSDOM } from 'jsdom'
import { ElementListenerGroup } from './element-listener-group'
describe('Element Listener Group', () => {
    it('base', function() {
        let flag = false
        let dom = new JSDOM()
        let document = dom.window.document.body
        let group = new ElementListenerGroup(document)
        group.add('click', () => {
            flag = true
        })
        document.click()
        expect(flag).to.equal(true)
    })
    it('off', function() {
        let flag = false
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        group.add('click', () => {
            flag = true
        }).off().off()
        body.click()
        expect(flag).to.equal(false)
    })
    it('clear', function() {
        let flag = false
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        group.add('click', () => {
            flag = true
        })
        group.clear()
        body.click()
        expect(flag).to.equal(false)
    })
    it('lock', function() {
        let flag = false
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        group.add('click', () => {
            flag = true
        }).lock()
        group.clear()
        body.click()
        expect(flag).to.equal(true)
    })
    it('unlock', function() {
        let flag = false
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        let list = group.add('click', () => {
            flag = true
        }).lock()
        list.lock(false)
        group.clear()
        body.click()
        expect(flag).to.equal(false)
    })
    it('double click', function() {
        let count = 0
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        group.add('click', () => {
            count += 1
        })
        body.click()
        body.click()
        group.clear()
        body.click()
        expect(count).to.equal(2)
    })
})
