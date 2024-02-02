import { expect } from 'chai'
import { text } from './text'

const { byteLength, replaceVar, headMatch, lastMatch, format, findMatchOrLast } = text

describe('String', () => {
    it('headMatch', async function() {
        let a = 'verify'
        let b = 'verify:123'
        let c = 'verisy:123'
        expect(headMatch(b, a)).to.equal(true)
        expect(headMatch(c, a)).to.equal(false)
    })
    it('lastMatch', async function() {
        let a = '1234'
        let b = 'verify:1234'
        let c = 'verisy:1235'
        expect(lastMatch(b, a)).to.equal(true)
        expect(lastMatch(c, a)).to.equal(false)
    })
    it('byteLength', async function() {
        expect(byteLength('א')).to.equal(2)
        expect(byteLength('a c')).to.equal(3)
        expect(byteLength('測試')).to.equal(6)
        expect(byteLength('😀')).to.equal(4)
    })
    it('byteLength', async function() {
        expect(byteLength('א')).to.equal(2)
        expect(byteLength('a c')).to.equal(3)
        expect(byteLength('測試')).to.equal(6)
        expect(byteLength('😀')).to.equal(4)
    })
    it('format', async function() {
        expect(format('vvvv-vvv-***', '0900123456')).to.equal('0900-123-***')
        expect(format('vvvv-vvv-***', '09001', 'a')).to.equal('0900-1aa-***')
    })
    it('findMatchOrLast', async function() {
        expect(findMatchOrLast('hello', ['hello', 'world', 'dave'])).to.equal('hello')
        expect(findMatchOrLast('helloo', ['hello', 'world', 'dave'])).to.equal('dave')
        expect(findMatchOrLast('world', ['hello', 'world', 'dave'])).to.equal('world')
        expect(findMatchOrLast('helloo', [])).to.equal(null)
    })
    it('replaceVar', async function() {
        let result = replaceVar({
            start: '{',
            end: '}',
            text: '我是{狗}，你是{豬}，大家都是{哺乳}動物',
            vars: {
                狗: 123,
                哺乳: 456,
                豬: '789'
            }
        })
        expect(result).to.equal('我是123，你是789，大家都是456動物')
        let result2 = replaceVar<any, any, any>({
            start: '{{',
            end: '>>>',
            text: '我是{{狗>>>，你是{{豬>>>，大家都是{A{哺乳}>>動物',
            vars: {
                狗: 123,
                豬: 456,
                哺乳: 456
            }
        })
        expect(result2).to.equal('我是123，你是456，大家都是{A{哺乳}>>動物')
        let result3 = replaceVar({
            start: '{{',
            end: '>>>',
            text: '我是{{狗>>，你是{{豬 >，大家都是{{哺乳>>>動物',
            vars: {
                '狗>>，你是{{豬 >，大家都是{{哺乳': 124
            }
        })
        expect(result3).to.equal('我是124動物')
        let result4 = replaceVar({
            start: '{{',
            end: '}}',
            text: '我是{{ 豬 }}，是一種 {{  哺乳    }} 動物',
            vars: {
                豬: '123',
                哺乳: '456'
            }
        })
        expect(result4).to.equal('我是123，是一種 456 動物')
        let result5 = replaceVar<any, any, any>({
            start: '{{',
            end: '}}',
            text: '我是{{ 狗 }}，是一種 {{  哺乳 }} 動物',
            vars: {
                豬: '123'
            }
        })
        expect(result5).to.equal('我是，是一種  動物')
        let result6 = replaceVar<any, any, any>({
            start: '{{',
            end: '}}',
            text: '我是{{ 狗 }}，是一種 {{  哺乳 }} 動物',
            dafaultVar: '-',
            vars: {
                豬: '123'
            }
        })
        expect(result6).to.equal('我是-，是一種 - 動物')
        let result7 = replaceVar<any, any, any>({
            start: '{{',
            end: '}}',
            text: '我是{{ 狗動物',
            dafaultVar: '-',
            vars: {}
        })
        expect(result7).to.equal('我是{{ 狗動物')
        let result8 = replaceVar({
            start: '{',
            end: '}',
            text: '我是{狗}，你是{豬}，大家都是{哺乳}動物',
            // @ts-ignore
            vars: null
        })
        expect(result8).to.equal('我是，你是，大家都是動物')
        let result9 = replaceVar({
            start: '{',
            end: '}',
            text: '我是{狗}',
            // @ts-ignore
            vars: {
                '狗': 0
            }
        })
        expect(result9).to.equal('我是0')
    })
})
