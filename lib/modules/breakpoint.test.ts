import { expect } from 'chai'
import { Breakpoint } from './breakpoint.js'

describe('Breakpoint', () => {
    it('basic', function() {
        let breakpoint = new Breakpoint({
            defCheckValue: () => 100,
            points: Breakpoint.bootstrapBreakpoints
        })
        expect(breakpoint.is()).eq('xs')
        expect(breakpoint.matchs().join()).eq('xs-only,xs-and-up,xs-and-down,sm-and-down,md-and-down,lg-and-down,xl-and-down')
        // @ts-ignore
        expect(breakpoint.is('ouo')).eq('xs')
        expect(breakpoint.in('lg-and-down')).eq(true)
        expect(breakpoint.in('sm-and-up', 500)).eq(false)
    })
    it('bootstrap', function() {
        let breakpoint = new Breakpoint({
            defCheckValue: () => 0,
            points: Breakpoint.bootstrapBreakpoints
        })
        expect(breakpoint.is(0)).eq('xs')
        expect(breakpoint.is(700)).eq('sm')
        expect(breakpoint.is(900)).eq('md')
        expect(breakpoint.is(1000)).eq('lg')
        expect(breakpoint.is(1222)).eq('xl')
    })
    it('vuetify', function() {
        let breakpoint = new Breakpoint({
            defCheckValue: () => 0,
            points: Breakpoint.vuetifyBreakpoints
        })
        expect(breakpoint.is(0)).eq('xs')
        expect(breakpoint.is(700)).eq('sm')
        expect(breakpoint.is(980)).eq('md')
        expect(breakpoint.is(1300)).eq('lg')
        expect(breakpoint.is(2022)).eq('xl')
    })
})
