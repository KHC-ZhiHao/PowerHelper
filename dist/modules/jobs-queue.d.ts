import { Event } from './event';
declare type Job = {
    name: string;
    handler: () => Promise<any>;
};
declare type Events = {
    allDone: Record<string, unknown>;
    error: {
        name: string;
        error: any;
    };
};
declare type Params = {
    autoPlay?: boolean;
    concurrentExecutions: number;
};
export declare class JobsQueue extends Event<Events> {
    private jobs;
    private closed;
    private params;
    private isStop;
    private runningCount;
    constructor(params: Params);
    /** 現有的 jobs 長度 */
    get size(): number;
    private run;
    private less;
    get isStoped(): boolean;
    /** 將一組 job 新增至 queue 末端 */
    push(name: string, handler: Job['handler']): void;
    /** 暫停 queue */
    stop(): void;
    /** 恢復 queue */
    play(): void;
    /** 將一組 job 新增至 queue 末端，同時回應一組 promise 可以等待直到該任務完成為止。 */
    pushAndWait(name: string, handler: Job['handler']): Promise<null>;
    /** 將一組 job 新增至最優先級 */
    unshift(name: string, handler: Job['handler']): void;
    /** 清空現有的 jobs */
    clear(): void;
    /** 關閉這組 queue ，將無效化 push, unshift，且清空現有的 jobs */
    close(): void;
}
export {};
