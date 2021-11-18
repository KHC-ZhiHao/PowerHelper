import { expect } from 'chai'
import { byteLength, replaceVar } from './text'

describe('String', () => {
    it('byteLength', async function() {
        expect(byteLength('א')).to.equal(2)
        expect(byteLength('a c')).to.equal(3)
        expect(byteLength('測試')).to.equal(6)
        expect(byteLength('😀')).to.equal(4)
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
                "狗>>，你是{{豬 >，大家都是{{哺乳": 124
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
    })
})
