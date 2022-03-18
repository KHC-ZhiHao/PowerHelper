import { importScript } from './element'

describe('Element', () => {
    beforeEach(() => {
        const window = {
            document: {
                body: {
                    appendChild: (el: any) => el.onload()
                },
                getElementsByTagName() {
                    return []
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
        await importScript('./html')
    })
})
