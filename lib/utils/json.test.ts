import { expect } from 'chai'
import { jpjs, nonStrictJSONParse, nonStrictJSONStringify } from './json'

describe('Json', () => {
    it('jpjs', async function() {
        let ori = {
            name: 'dave'
        }
        let data = jpjs(ori)
        expect(data.name).to.equal(ori.name)
        expect(data === ori).to.equal(false)
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
