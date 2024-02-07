import { expect } from 'chai'
import { PreloadPort } from './preload-port'

describe('PreloadPort', () => {
    it('base', async function() {
        let port = new PreloadPort<number, number>({
            ttl: 100,
            handler: async(data) => {
                return data
            }
        })
        let id = port.create(1)
        let data = await port.get(id, 2)
        expect(data).eq(1)
    })
    it('cover', async function() {
        let port = new PreloadPort<number, number>({
            ttl: 100,
            handler: async(data) => {
                return data
            }
        })
        let id = port.create(1)
        let data = await port.get(id, 2)
        expect(data).eq(1)
    })
    it('remove', async function() {
        let port = new PreloadPort<number, number>({
            ttl: 100,
            handler: async(data) => {
                return data
            }
        })
        let id = port.create(1)
        port.remove(id)
        let data = await port.get(id, 2)
        expect(data).eq(2)
    })
    it('clear', async function() {
        let port = new PreloadPort<number, number>({
            ttl: 100,
            handler: async(data) => {
                return data
            }
        })
        port.create(1)
        port.clear()
        let data = await port.get(null, 2)
        expect(data).eq(2)
    })
})
