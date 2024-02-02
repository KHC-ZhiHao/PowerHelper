import { Event } from './event';
/**
 * 就如同 setInterval (實際上也是) 一樣運作，只是你可以監聽好幾組事件。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/ticker.md
 */
export declare class Ticker extends Event<{
    next: {
        /** 執行次數 */
        delta: number;
        /** 上次執行時間與這次的差異毫秒 */
        timeGap: number;
    };
}> {
    private int;
    private isStop;
    private delta;
    private previousTime;
    constructor(ms: number, options?: {
        /** 是否預設為自動執行 */
        autoPlay?: boolean;
    });
    private run;
    /** 暫停 event 被呼叫 */
    stop(): void;
    /** 假如是暫停狀態可以透過 play 繼續定時執行 event */
    play(): void;
    /** 關閉 Interval 的執行 */
    close(): void;
}
