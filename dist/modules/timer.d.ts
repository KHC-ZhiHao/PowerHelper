import { Ticker } from './ticker';
/**
 * 一組計時器，可以正向也可以反向計時。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/timer.md
 */
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
