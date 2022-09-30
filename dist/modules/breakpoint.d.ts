declare type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
declare type BreakpointsRange = `${Breakpoints}-${'only' | 'and-up' | 'and-down'}`;
declare type BreakpointsRecord = Record<Breakpoints, {
    min: number;
    max: number;
}>;
declare type Params = {
    points: BreakpointsRecord;
    defCheckValue: () => number;
};
export declare class Breakpoint {
    private params;
    constructor(params: Params);
    /**
     * 基於 bootstrap 5 的斷點響應設定
     */
    static get bootstrapBreakpoints(): BreakpointsRecord;
    /**
     * 基於 vuetify 2 的斷點響應設定
     */
    static get vuetifyBreakpoints(): BreakpointsRecord;
    /**
     * 獲取符合的斷點列表
     */
    matchs(width?: number): ("xs-only" | "xs-and-up" | "xs-and-down" | "sm-only" | "sm-and-up" | "sm-and-down" | "md-only" | "md-and-up" | "md-and-down" | "lg-only" | "lg-and-up" | "lg-and-down" | "xl-only" | "xl-and-up" | "xl-and-down")[];
    /**
     * 現在位於哪個斷點
     */
    is(width?: number): Breakpoints;
    /**
     * 是否在指定斷點內
     */
    in(breakpoint: BreakpointsRange, width?: number): boolean;
}
export {};
