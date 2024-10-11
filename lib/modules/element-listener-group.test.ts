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
        }).off()
        body.click()
        expect(flag).to.equal(false)
    })
    it('off from self', function() {
        let flag = false
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        let { id } = group.add('click', () => {
            flag = true
        })
        group.off(id)
        body.click()
        expect(flag).to.equal(false)
    })
    it('off from empty', function() {
        let flag = false
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup(body)
        group.add('click', () => {
            flag = true
        })
        group.off('123')
        body.click()
        expect(flag).to.equal(true)
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
    it('observe', function() {
        let count = 0
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup<HTMLElement>()
        group.add('click', () => {
            count += 1
        })
        body.click()
        group.observe(body)
        body.click()
        group.clear()
        body.click()
        expect(count).to.equal(1)
    })
    it('observe2', function() {
        let count = 0
        let dom = new JSDOM()
        let body = dom.window.document.body
        let newEl = dom.window.document.createElement('div')
        let group = new ElementListenerGroup<HTMLElement>()
        group.add('click', () => {
            count += 1
        })
        group.observe(body)
        body.click()
        group.observe(newEl)
        body.click()
        newEl.click()
        group.clear()
        body.click()
        newEl.click()
        expect(count).to.equal(3)
    })
    it('unobserve', function() {
        let count = 0
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup<HTMLElement>()
        group.add('click', () => {
            count += 1
        })
        group.observe(body)
        body.click()
        group.unObserve(body)
        body.click()
        expect(count).to.equal(1)
    })
    it('unobserve2', function() {
        let dom = new JSDOM()
        let body = dom.window.document.body
        let group = new ElementListenerGroup<HTMLElement>()
        group.unObserve(body)
    })
    it('clearElements', function() {
        let count = 0
        let dom = new JSDOM()
        let body = dom.window.document.body
        let newEl = dom.window.document.createElement('div')
        let group = new ElementListenerGroup<HTMLElement>()
        group.add('click', () => {
            count += 1
        })
        group.observe(body)
        group.observe(newEl)
        body.click()
        newEl.click()
        group.clearElements()
        body.click()
        newEl.click()
        expect(count).to.equal(2)
    })
})
