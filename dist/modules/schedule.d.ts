import { Base } from '../module-base';
export declare class Schedule extends Base {
    private int;
    private isStop;
    private lastTime;
    private processes;
    constructor();
    private run;
    add(name: string, intervalMs: number, callback: () => Promise<any>): void;
    remove(name: string): void;
    info(): {
        name: string;
        runningTime: number | null;
        executedCount: number;
    }[];
    stop(): void;
    play(): void;
    close(): void;
}
