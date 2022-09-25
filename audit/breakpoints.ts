const breakpoints = {
    xs: {
        min: 0,
        max: 767
    },
    sm: {
        min: 768,
        max: 991
    },
    md: {
        min: 992,
        max: 1199
    },
    lg: {
        min: 1200,
        max: Infinity
    }
} as const

export const isBreakpoint = function(breakpoint: `${keyof typeof breakpoints}-${'only' | 'and-up' | 'and-down'}`, el: HTMLElement | Window = window) {
    let width = el instanceof Window ? el.innerWidth : el.clientWidth
    let matchs: string[] = []
    for (let name in breakpoints) {
        let { min, max } = breakpoints[name as 'xs' | 'sm' | 'md' | 'lg']
        if (width >= min && width <= max) {
            matchs.push(`${name}-only`)
        } else if (width >= min) {
            matchs.push(`${name}-and-up`)
        } else if (width <= max) {
            matchs.push(`${name}-and-down`)
        }
    }
    return matchs.includes(breakpoint)
}
