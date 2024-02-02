import { expect } from 'chai'
import { Pool } from './pool'
import { flow } from '../utils/flow'

const { sleep } = flow

type Params = {
    name: string
}

describe('Pool', () => {
    it('base', async function() {
        let pool = new Pool<Params, Params>({
            find: (data, params) => {
                return data.name === params.name
            },
            fetch: async(params) => {
                return params
            }
        })
        let data = await pool.pick({
            name: 'dave'
        })
        expect(data.name).eq('dave')
    })
    it('cover', async function() {
        let pool = new Pool<Params, Params>({
            find: (data, params) => {
                return data.name === params.name
            },
            fetch: async(params) => {
                return params
            },
            cache: {
                ttl: 100,
                maxSize: 2
            },
            collection: {
                waitTime: 100
            }
        })
        let data = await pool.pick({
            name: 'dave'
        })
        expect(data.name).eq('dave')
    })
    it('list', async function() {
        let pool = new Pool<Params, Params>({
            find: (data, params) => {
                return data.name === params.name
            },
            fetch: async(params) => {
                return params
            }
        })
        let data = await pool.list([
            {
                name: 'dave'
            },
            {
                name: 'james'
            }
        ])
        expect(data[0].name).eq('dave')
        expect(data[1].name).eq('james')
    })
    it('remove', async function() {
        type Res = {
            name: string
            createdAt: number
        }
        let pool = new Pool<Params, Res>({
            find: (data, params) => {
                return data.name === params.name
            },
            fetch: async(params) => {
                return params.map(e => {
                    return {
                        name: e.name,
                        createdAt: Date.now()
                    }
                })
            }
        })
        let data = await pool.pick({
            name: 'dave'
        })
        let data2 = await pool.pick({
            name: 'dave'
        })
        expect(data.name).eq('dave')
        expect(data).eq(data2)
        pool.remove({
            name: 'dave'
        })
        await sleep(10)
        let data3 = await pool.pick({
            name: 'dave'
        })
        expect(data3.createdAt > data.createdAt).eq(true)
    })

    it('set', async function() {
        type Res = {
            name: string
            createdAt: number
        }
        let pool = new Pool<Params, Res>({
            find: (data, params) => {
                return data.name === params.name
            },
            fetch: async(params) => {
                return params.map(e => {
                    return {
                        name: e.name,
                        createdAt: Date.now()
                    }
                })
            }
        })
        pool.set({
            name: 'dave'
        }, {
            name: 'dave',
            createdAt: 1234
        })
        let data = await pool.pick({
            name: 'dave'
        })
        expect(data.createdAt).eq(1234)
    })

    it('remove', async function() {
        type Res = {
            name: string
            createdAt: number
        }
        let pool = new Pool<Params, Res>({
            find: (data, params) => {
                return data.name === params.name
            },
            fetch: async(params) => {
                return params.map(e => {
                    return {
                        name: e.name,
                        createdAt: Date.now()
                    }
                })
            }
        })
        let data = await pool.pick({
            name: 'dave'
        })
        let data2 = await pool.pick({
            name: 'dave'
        })
        expect(data.name).eq('dave')
        expect(data).eq(data2)
        pool.clear()
        await sleep(10)
        let data3 = await pool.pick({
            name: 'dave'
        })
        expect(data3.createdAt > data.createdAt).eq(true)
    })
})
