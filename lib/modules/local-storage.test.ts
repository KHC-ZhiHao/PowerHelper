import { expect } from 'chai'
import { LocalStorage } from './local-storage'

describe('LocalStorage', () => {
    beforeEach(() => {
        const items: any = {
            setItem: (key: string, value: any) => items[key] = value,
            getItem: (key: string) => items[key],
            removeItem: (key: string) => delete items[key]
        }
        LocalStorage.setGlobalLocalStorage(items)
    })
    it('base', function() {
        let localStorage = new LocalStorage('test')
        localStorage.set('name', 'dev')
        expect(localStorage.get('name')).to.equal('dev')
    })
    it('clear', function() {
        let localStorage = new LocalStorage('test')
        localStorage.set('name', 'dev')
        localStorage.clear()
        expect(localStorage.get('name')).to.equal(undefined)
    })
    it('dafaultColumns', function() {
        let localStorage = new LocalStorage('test', {
            dafaultColumns: {
                name: 'dev'
            }
        })
        expect(localStorage.get('name')).to.equal('dev')
    })
    it('default already exists', function() {
        const items: any = {
            setItem: (key: string, value: any) => items[key] = value,
            getItem: (key: string) => items[key],
            removeItem: (key: string) => delete items[key],
            '_power_test/name': '"dev"'
        }
        LocalStorage.setGlobalLocalStorage(items)
        let localStorage = new LocalStorage('test', {
            dafaultColumns: {
                name: 'ouo'
            }
        })
        expect(localStorage.get('name')).to.equal('dev')
    })
    it('cover', function() {
        LocalStorage.setGlobalLocalStorage(null)
        let localStorage = new LocalStorage('test', {})
        localStorage.set('test', 'test')
        localStorage.get('test')
        localStorage.clear()
        localStorage.remove('test')
    })
    it('cover', function() {
        LocalStorage.setGlobalLocalStorage(null)
        global.window = {
            // @ts-ignore
            localStorage: {}
        }
        new LocalStorage('test')
        // @ts-ignore
        global.window = undefined
    })
})
