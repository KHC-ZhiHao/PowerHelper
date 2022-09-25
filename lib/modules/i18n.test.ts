import { I18n } from './i18n'
import { expect } from 'chai'

type Locales = 'zh' | 'en'

describe('Hook', () => {
    it('base', function() {
        const keys = {
            'name': '名稱',
            'hello {Name}': '你好 {Name}'
        }
        const i18n = new I18n<Locales, keyof typeof keys>({
            locales: {
                'zh': keys,
                'en': {
                    name: 'Name',
                    'hello {Name}': 'Hello {Name}'
                }
            }
        })
        expect(i18n.export('en')('name')).eq('Name')
        expect(i18n.export('zh')('name')).eq('名稱')
        expect(i18n.export('en')('hello {Name}', { Name: '小白' })).eq('Hello 小白')
        expect(i18n.export('zh')('hello {Name}', { Name: '小白' })).eq('你好 小白')
    })
    it('escape', function() {
        const keys = {
            'name': '名稱'
        }
        const i18n = new I18n<Locales, keyof typeof keys>({
            locales: {
                'zh': keys,
                'en': {
                    name: 'Name'
                }
            }
        })
        expect(i18n.export('en')('## ouo')).eq('ouo')
        expect(i18n.export('en')('## you are {Name}', { Name: '123' })).eq('you are 123')
    })
    it('no key', function() {
        const keys = {
            'name': '名稱'
        }
        const i18n = new I18n<Locales, keyof typeof keys>({
            locales: {
                'zh': keys,
                'en': {
                    name: 'Name'
                }
            }
        })
        // @ts-ignore
        expect(i18n.export('en')('ouo')).eq('ouo')
        // @ts-ignore
        expect(i18n.export('en')('hey {name}', { name: '123' })).eq('hey 123')
    })
})
