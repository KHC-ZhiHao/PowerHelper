import { expect } from 'chai'
import { importScript, importCss, createAndAppend } from './element'

describe('Element', () => {
    beforeEach(() => {
        const window = {
            innerWidth: 768,
            document: {
                body: {
                    appendChild: (el: any) => {
                        if (el.onload) {
                            el.onload()
                        }
                    }
                },
                getElementsByTagName() {
                    return [
                        {
                            src: './html',
                            href: './html'
                        }
                    ]
                },
                createElement() {
                    return {}
                }
            }
        }
        // @ts-ignore
        global.window = window
    })
    afterEach(() => {
        // @ts-ignore
        global.window = undefined
    })
    it('importScript', async function() {
        await importScript('./htmll')
    })
    it('importScript same', async function() {
        await importScript('./html')
    })
    it('importScript appendBefore', async function() {
        let flag = 0
        await importScript('./htmll', {
            appendBefore: () => {
                flag += 1
            }
        })
        expect(flag).eq(1)
    })
    it('importScript appendBefore same', async function() {
        let flag = 0
        await importScript('./html', {
            appendBefore: () => {
                flag += 1
            }
        })
        expect(flag).eq(0)
    })
    it('importScript appendBefore cover', async function() {
        let flag = 0
        await importScript('./htmll', {})
        expect(flag).eq(0)
    })
    it('importCss', async function() {
        await importCss('./htmll')
    })
    it('importCss same', async function() {
        await importCss('./html')
    })
    it('importCss appendBefore', async function() {
        let flag = 0
        await importCss('./htmll', {
            appendBefore: () => {
                flag += 1
            }
        })
        expect(flag).eq(1)
    })
    it('importCss appendBefore cover', async function() {
        let flag = 0
        await importCss('./htmll', {})
        expect(flag).eq(0)
    })
    it('importCss appendBefore same', async function() {
        let flag = 0
        await importCss('./html', {
            appendBefore: () => {
                flag += 1
            }
        })
        expect(flag).eq(0)
    })
    it('createAndAppend', async function() {
        const el = createAndAppend('a', el => {
            el.href = '123'
        })
        expect(el.href).eq('123')
    })
    it('createAndAppend target', async function() {
        const el = createAndAppend('a', el => {
            el.href = '123'
        }, window.document.body)
        expect(el.href).eq('123')
    })
})
