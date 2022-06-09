declare type Pick = 'first' | 'last';
declare type Options = {
    delay?: number;
};
export declare class PromiseOverlap<T> {
    private pick;
    private options;
    private processes;
    constructor(pick: Pick, options?: Options);
    run(cb: () => Promise<T>): Promise<T>;
}
export {};
