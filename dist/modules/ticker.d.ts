import { Event } from './event';
export declare class Ticker extends Event<{
    next: {
        delta: number;
    };
}> {
    private int;
    private isStop;
    private delta;
    constructor(ms?: number, autoPlay?: boolean);
    private run;
    stop(): void;
    play(): void;
    close(): void;
}
