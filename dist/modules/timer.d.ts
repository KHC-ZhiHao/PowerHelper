import { Ticker } from './ticker';
export declare class Timer extends Ticker {
    private nowTime;
    private minTime;
    private maxTime;
    private positive;
    constructor();
    setPositive(positive: boolean): this;
    setMinTime(ms: number): void;
    setMaxTime(ms: number): void;
    getTime(): number;
    setTime(ms: number): this;
    addTime(ms: number): this;
    subtractTime(ms: number): this;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    getMicroseconds(): number;
    getTimeString(format?: string): string;
}
