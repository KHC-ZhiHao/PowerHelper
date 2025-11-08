import { expect } from 'chai'
import { StyleString } from './style-string.js'

describe('Style String', () => {
    it('base', function() {
        let ss = new StyleString()
        ss.set('textAlign', 'center')
        ss.set('textAlign', 'left')
        ss.set('fontSize', '3px')
        ss.set('width', undefined, '6px')
        ss.set('height', undefined)
        expect(ss.join()).to.equal('text-align:left;font-size:3px;width:6px')
        expect(ss.join(',')).to.equal('text-align:left,font-size:3px,width:6px')
    })
    it('active', function() {
        let ss = new StyleString()
        ss.set('textAlign', 'center')
        expect(ss.get('textAlign')).to.equal('center')
        ss.remove('textAlign')
        ss.remove('color')
        expect(ss.get('textAlign')).to.equal(undefined)
    })
    it('assign', function() {
        let ss = new StyleString()
        let fake: any = {
            style: {}
        }
        ss.set('textAlign', 'center')
        ss.assign(fake)
        expect(fake.style.textAlign).to.equal('center')
    })
})
