import { expect } from 'chai'
import { sleep } from '../utils/flow'
import { LocalStorage } from './local-storage'

const getStorage = () => {
    const items: any = {
        setItem: (key: string, value: any) => items[key] = value,
        getItem: (key: string) => items[key],
        removeItem: (key: string) => delete items[key]
    }
    return items
}

describe('LocalStorage', () => {
    it('base', function() {
        let localStorage = new LocalStorage('test', {
            storageSystem: getStorage()
        })
        localStorage.set('name', 'dev')
        expect(localStorage.get('name')).to.equal('dev')
    })
    it('clear', function() {
        let localStorage = new LocalStorage('test', {
            storageSystem: getStorage()
        })
        localStorage.set('name', 'dev')
        localStorage.clear()
        expect(localStorage.get('name')).to.equal(undefined)
    })
    it('dafaultColumns', function() {
        let localStorage = new LocalStorage('test', {
            storageSystem: getStorage(),
            dafaultColumns: {
                test: () => 'dev'
            }
        })
        expect(localStorage.get('test')).to.equal('dev')
    })
    it('default already exists', function() {
        const items: any = {
            setItem: (key: string, value: any) => items[key] = value,
            getItem: (key: string) => items[key],
            removeItem: (key: string) => delete items[key],
            '_power_test/name': JSON.stringify('dev')
        }
        let localStorage = new LocalStorage('test', {
            storageSystem: items,
            dafaultColumns: {
                name: () => 'ouo'
            }
        })
        expect(localStorage.get('name')).to.equal('dev')
    })
    it('intercept', async function() {
        const items: any = {
            setItem: (key: string, value: any) => items[key] = value,
            getItem: (key: string) => items[key],
            removeItem: (key: string) => delete items[key]
        }
        let localStorage = new LocalStorage('test', {
            storageSystem: items,
            intercept: {
                get(name, data) {
                    if (Date.now() > data.exp) {
                        localStorage.remove(name)
                        return null
                    }
                    return data.data
                },
                set(name, data) {
                    return {
                        data,
                        exp: Date.now() + 100
                    }
                }
            }
        })
        localStorage.set('name', 'dave')
        expect(localStorage.get('name')).to.equal('dave')
        await sleep(150)
        expect(localStorage.get('name')).to.equal(null)
    })
    it('cover', function() {
        new LocalStorage('test', {
            intercept: {}
        })
        let localStorage = new LocalStorage('test', {})
        localStorage.set('test', 'test')
        localStorage.get('test')
        localStorage.clear()
        localStorage.remove('test')
    })
    it('cover', function() {
        global.window = {
            // @ts-ignore
            localStorage: {}
        }
        new LocalStorage('test')
        // @ts-ignore
        global.window = undefined
    })
    it('set with callback', function() {
        let localStorage = new LocalStorage('test', {
            storageSystem: getStorage()
        })
        localStorage.set('name', () => 'qwer')
        expect(localStorage.get('name')).to.equal('qwer')
    })
})
