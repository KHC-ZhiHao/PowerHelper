import { I18n } from './i18n'
import { expect } from 'chai'

type Locales = 'zh' | 'en'

const getI18n = () => {
    const keys = {
        'name': '名稱',
        'hello {Name}': '你好 {Name}'
    }
    return new I18n<Locales, keyof typeof keys>({
        def: 'zh',
        locales: {
            'zh': keys,
            'en': {
                name: 'Name',
                'hello {Name}': 'Hello {Name}'
            }
        }
    })
}

describe('Hook', () => {
    it('base', function() {
        const i18n = getI18n()
        expect(i18n.export('en')('name')).eq('Name')
        expect(i18n.export('zh')('name')).eq('名稱')
        expect(i18n.export('en')('hello {Name}', { Name: '小白' })).eq('Hello 小白')
        expect(i18n.export('zh')('hello {Name}', { Name: '小白' })).eq('你好 小白')
    })
    it('locale', function() {
        const i18n = getI18n()
        expect(i18n.t('name')).eq('名稱')
        i18n.setLocale('en')
        expect(i18n.t('hello {Name}', { Name: '小白' })).eq('Hello 小白')
        expect(i18n.getLocale()).eq('en')
    })
    it('load key', function() {
        const i18n = getI18n()
        expect(i18n.key('hello {Name}', { Name: '小白' }).get('zh')).eq('你好 小白')
    })
    it('escape', function() {
        const i18n = getI18n()
        expect(i18n.export('en')('## ouo')).eq('ouo')
        expect(i18n.export('en')('## you are {Name}', { Name: '123' })).eq('you are 123')
    })
    it('no key', function() {
        const i18n = getI18n()
        // @ts-ignore
        expect(i18n.export('en')('ouo')).eq('ouo')
        // @ts-ignore
        expect(i18n.export('en')('hey {name}', { name: '123' })).eq('hey 123')
    })
})
