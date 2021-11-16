import { Event } from './event';
declare type Color = 'default' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'cyan' | 'white';
declare type LogType = 'normal' | 'dev' | 'super-error' | 'error' | 'warning' | 'fixme' | 'todo';
declare type Channels = {
    print: {
        time: string;
        name: string;
        data: any;
        step: number;
        color: Color;
        message: string;
        logType: LogType;
    };
};
export declare class Log extends Event<Channels> {
    private step;
    private name;
    private isSilence;
    private defaultLogType;
    constructor(name: string, options?: {
        silence?: boolean;
        defaultLogType?: LogType;
    });
    private getNow;
    private toPrintString;
    /**
     * 可以繼續呼叫 print 但不會打印 log。
     */
    silence(active?: boolean): void;
    /**
     * 打印 log。
     */
    print(data: any, options?: {
        color?: Color;
        logType?: LogType;
    }): {
        time: string;
        name: string;
        step: number;
        data: any;
        color: Color;
        message: string;
        logType: LogType;
    };
}
export {};
