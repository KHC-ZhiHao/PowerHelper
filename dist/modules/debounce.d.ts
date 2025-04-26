import { Event } from './event';
type Params = {
    /** 等待超時時間，單位:毫秒 */
    delay?: number;
    /** 如果超過這個時間則無論如何都觸發 trigger，單位:毫秒 */
    totalDuration?: number;
    /** 存取資料超過指定長度時觸發 */
    maxValueLength?: number;
};
type Channels<T> = {
    input: {
        value: T;
    };
    trigger: {
        values: T[];
    };
};
/**
 * 去抖動功能，當觸發事件後會搜集結果並延遲事件發生，避免頻繁發出請求
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/debounce.md
 */
export declare class Debounce<T> extends Event<Channels<T>> {
    private unit;
    private params;
    constructor(params: Params);
    /** 加入一組值，並且 delay 重新計算 */
    input(value: T): void;
    /** 不須等待直接觸發事件 */
    trigger(): void;
    /** 終止現在正在運行的 input */
    close(): void;
}
export {};
