import { expect } from 'chai'
import { importScript } from './element'

describe('Element', () => {
    beforeEach(() => {
        const window = {
            innerWidth: 768,
            document: {
                body: {
                    appendChild: (el: any) => el.onload()
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
})
