type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type BreakpointsRange = `${Breakpoints}-${'only' | 'and-up' | 'and-down'}`

type BreakpointsRecord = Record<Breakpoints, {
    min: number
    max: number
}>

type Params = {
    points: BreakpointsRecord
    defCheckValue: () => number
}

/**
 * 畫面斷點驗證工具。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/breakpoint.md
 */

export class Breakpoint {
    private params: Params

    constructor(params: Params) {
        this.params = params
    }

    /**
     * 基於 bootstrap 5 的斷點響應設定
     */

    static get bootstrapBreakpoints(): BreakpointsRecord {
        return {
            xs: {
                min: Infinity * -1,
                max: 575
            },
            sm: {
                min: 576,
                max: 767
            },
            md: {
                min: 768,
                max: 991
            },
            lg: {
                min: 992,
                max: 1119
            },
            xl: {
                min: 1200,
                max: Infinity
            }
        }
    }

    /**
     * 基於 vuetify 2 的斷點響應設定
     */

    static get vuetifyBreakpoints(): BreakpointsRecord {
        return {
            xs: {
                min: Infinity * -1,
                max: 599
            },
            sm: {
                min: 600,
                max: 959
            },
            md: {
                min: 960,
                max: 1263
            },
            lg: {
                min: 1264,
                max: 1903
            },
            xl: {
                min: 1904,
                max: Infinity
            }
        }
    }

    /**
     * 獲取符合的斷點列表
     */

    matchs(width = this.params.defCheckValue()) {
        let matchs: BreakpointsRange[] = []
        for (let _name in this.params.points) {
            let name = _name as Breakpoints
            let { min, max } = this.params.points[name]
            if (width >= min && width <= max) {
                matchs.push(`${name}-only`)
            }
            if (width >= min) {
                matchs.push(`${name}-and-up`)
            }
            if (width <= max) {
                matchs.push(`${name}-and-down`)
            }
        }
        return matchs
    }

    /**
     * 現在位於哪個斷點
     */

    is(width = this.params.defCheckValue()): Breakpoints {
        let ranks: Breakpoints[] = ['xl', 'lg', 'md', 'sm', 'xs']
        let matchs = this.matchs(width)
        for (let rank of ranks) {
            if (matchs.includes(`${rank}-only`)) {
                return rank as Breakpoints
            }
        }
        return 'xs'
    }

    /**
     * 是否在指定斷點內
     */

    in(breakpoint: BreakpointsRange, width = this.params.defCheckValue()) {
        return this.matchs(width).includes(breakpoint)
    }
}
