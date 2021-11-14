import { expect } from 'chai'
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
                test: 'dev'
            }
        })
        expect(localStorage.get('test')).to.equal('dev')
    })
    it('default already exists', function() {
        const items: any = {
            setItem: (key: string, value: any) => items[key] = value,
            getItem: (key: string) => items[key],
            removeItem: (key: string) => delete items[key],
            '_power_test/name': JSON.stringify({
                data: 'dev'
            })
        }
        let localStorage = new LocalStorage('test', {
            storageSystem: items,
            dafaultColumns: {
                name: 'ouo'
            }
        })
        expect(localStorage.get('name')).to.equal('dev')
    })
    it('cover', function() {
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
})
