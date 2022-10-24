import { expect } from 'chai'
import { importScript, createAndAppend } from './element'

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
                            src: './html'
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
