import { Event } from './event';
declare type Info = {
    /** 程序名稱 */
    name: string;
    /** 運行當下時間，如果為 null 則尚未運行 */
    runningTime: number | null;
    /** 執行次數 */
    executedCount: number;
};
declare type Channels = {
    'processFail': {
        processName: string;
        error: any;
    };
};
export declare class Schedule extends Event<Channels> {
    private int;
    private isStop;
    private lastTime;
    private processes;
    private run;
    /** 加入一個程序，不能重複已存在的命名 */
    add(name: string, intervalMs: number, callback: () => Promise<any>): void;
    /** 驗證程序是否存在 */
    has(name: string): boolean;
    /** 刪除指定的程序 */
    remove(name: string): void;
    /** 獲取現在所有正在運作的程序 */
    info(): Info[];
    /** 暫停計時，正在運行中的程序不受限制 */
    stop(): void;
    /** 假如是暫停狀態可以透過 play 繼續計時 */
    play(): void;
    /** 關閉計時器 */
    close(): void;
}
export {};
