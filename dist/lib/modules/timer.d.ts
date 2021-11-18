import { Ticker } from './ticker';
export declare class Timer extends Ticker {
    private nowTime;
    private positive;
    constructor();
    setPositive(positive: boolean): this;
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
