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
        silence: boolean;
        logType: LogType;
    };
};
export declare class Log extends Event<Channels> {
    private step;
    private name;
    private isSilence;
    private defaultLogType;
    constructor(name: string, options?: {
        /** 是否預設為 silence 狀態 */
        silence?: boolean;
        /** 如果不指定 LogType 則預設此設定值 */
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
        silence: boolean;
    };
}
export {};
