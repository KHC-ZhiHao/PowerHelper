import { expect } from 'chai'
import { flow } from '../utils/flow.js'
import { AsyncLocalStorage } from './async-local-storage.js'

const getStorage = () => {
    const state: any = {}
    const items = {
        keys: async() => Object.keys(state),
        setItem: async(key: string, value: any) => state[key] = value,
        getItem: async(key: string) => state[key],
        removeItem: async(key: string) => {
            delete state[key]
        }
    }
    return items
}

const getLocalStorage = () => {
    const items: Storage = {
        clear: () => null,
        length: 0,
        key: (_index: number) => null,
        setItem: (key: string, value: any) => items[key] = value,
        getItem: (key: string) => items[key],
        removeItem: (key: string) => delete items[key]
    }
    return items
}

describe('AsyncLocalStorage', () => {
    it('base', async function() {
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: getStorage()
        })
        await localStorage.set('name', 'dev')
        expect(await localStorage.get('name')).to.equal('dev')
    })
    it('clear', async function() {
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: getStorage()
        })
        await localStorage.set('name', 'dev')
        await localStorage.clear()
        expect(await localStorage.get('name')).to.equal(null)
    })
    it('defaultColumns', async function() {
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: getStorage(),
            defaultColumns: {
                test: async() => 'dev'
            }
        })
        const result = await localStorage.get('test')
        expect(result).to.equal('dev')
    })
    it('default already exists', async function() {
        const state: any = {
            '_power_a_test/name': JSON.stringify('dev')
        }
        const items = {
            keys: async() => Object.keys(state),
            setItem: async(key: string, value: any) => state[key] = value,
            getItem: async(key: string) => state[key],
            removeItem: async(key: string) => {
                delete state[key]
            }
        }
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: items,
            defaultColumns: {
                name: async() => 'ouo'
            }
        })
        const result = await localStorage.get('name')
        expect(result).to.equal('dev')
    })
    it('intercept', async function() {
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: getStorage(),
            intercept: {
                async get(name, data) {
                    if (Date.now() > data.exp) {
                        localStorage.remove(name)
                        return null
                    }
                    return data.data
                },
                async set(name, data) {
                    return {
                        data,
                        exp: Date.now() + 100
                    }
                }
            }
        })
        await localStorage.set('name', 'dave')
        expect(await localStorage.get('name')).to.equal('dave')
        await flow.sleep(150)
        expect(await localStorage.get('name')).to.equal(null)
    })
    it('set with callback', async function() {
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: getStorage()
        })
        await localStorage.set('name', async() => 'qwer')
        expect(await localStorage.get('name')).to.equal('qwer')
    })
    it('height level control', async function() {
        let isDefaultFlag = false
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: getStorage(),
            defaultColumns: {
                name: async() => '1234'
            },
            intercept: {
                get(key, value, { isDefault, defaultValue }) {
                    isDefaultFlag = isDefault
                    return defaultValue()
                }
            }
        })
        expect(await localStorage.get('name')).to.equal('1234')
        expect(isDefaultFlag).to.equal(true)
    })
    it('to async storage', async function() {
        let localStorage = new AsyncLocalStorage('test', {
            storageSystem: AsyncLocalStorage.storageToAsyncStorage(getLocalStorage())
        })
        await localStorage.set('name', 'dev')
        await localStorage.set('namee', 'ddev')
        expect(await localStorage.get('name')).to.equal('dev')
        await localStorage.remove('name')
        expect(await localStorage.get('name')).to.equal(null)
        await localStorage.clear()
        expect(await localStorage.get('namee')).to.equal(null)
    })
})
