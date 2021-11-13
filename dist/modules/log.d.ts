import { Event } from './event';
declare type Color = 'default' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'cyan' | 'white';
declare type ImportantLevel = 0 | 1 | 2 | 3;
declare type Channels = {
    print: {
        time: string;
        name: string;
        data: any;
        step: number;
        color: string;
        message: string;
        importantLevel: ImportantLevel;
    };
};
export declare class Log extends Event<Channels> {
    private step;
    private name;
    private isSilence;
    constructor(name: string, options?: {
        silence?: boolean;
    });
    private getNow;
    private toPrintString;
    silence(active?: boolean): void;
    print(data: any, options?: {
        color?: Color;
        importantLevel?: ImportantLevel;
    }): {
        time: string;
        name: string;
        step: number;
        data: any;
        color: Color;
        message: string;
        importantLevel: ImportantLevel;
    };
}
export {};
