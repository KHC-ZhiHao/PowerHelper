import { expect } from 'chai'
import { json } from './json'

const { jpjs, nonStrictJSONParse, nonStrictJSONStringify } = json

describe('Json', () => {
    it('jpjs', async function() {
        let ori = {
            name: 'dave'
        }
        let data = jpjs(ori)
        expect(data.name).to.equal(ori.name)
        expect(data === ori).to.equal(false)
    })
    it('jpjs with replacer', async function() {
        let ori = {
            name: 'dave',
            age: undefined
        }
        // 將 undefined 轉換為 null
        let data = jpjs(ori, (key, value) => {
            if (value === undefined) {
                return null
            }
            return value
        })
        expect(data.age).to.equal(null)
        expect(Object.keys(data).length).to.equal(2)
    })
    it('nonStrictJSONParse success', async function() {
        let data = nonStrictJSONParse('{ "name": "123" }')
        expect(data.name).to.equal('123')
    })
    it('nonStrictJSONParse success 2', async function() {
        let data = nonStrictJSONParse({
            name: '123'
        } as any)
        expect(data.name).to.equal('123')
    })
    it('nonStrictJSONParse fail', async function() {
        let data = nonStrictJSONParse('{ name: "123" }')
        expect(data.name).to.equal(undefined)
    })
    it('nonStrictJSONStringify success', async function() {
        let data = nonStrictJSONStringify({
            name: '123'
        })
        expect(data).to.equal('{"name":"123"}')
    })
    it('nonStrictJSONStringify fail', async function() {
        let target = {
            self: null as any
        }
        target.self = target
        let data = nonStrictJSONStringify(target)
        expect(data).to.equal('{}')
    })
})
