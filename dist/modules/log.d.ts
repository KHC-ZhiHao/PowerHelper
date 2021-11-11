import { Event } from './event';
declare type Color = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'cyan' | 'white';
declare type ImportantLevel = 0 | 1 | 2 | 3;
declare type Message = {
    time: string;
    color: Color;
    content: string;
    importantLevel: ImportantLevel;
};
declare type Channels = {
    print: {
        time: string;
        name: string;
        data: any;
        color: string;
        importantLevel: ImportantLevel;
    };
};
export declare class Log extends Event<Channels> {
    private step;
    private name;
    private messages;
    private isSilence;
    constructor(name: string, silence?: boolean);
    static setDefaultColor(color: Color): void;
    private getNow;
    private toPrintString;
    silence(silence: boolean): void;
    print(data: any, options?: {
        color?: Color;
        importantLevel?: ImportantLevel;
    }): void;
    export(): string[];
    exportDetail(): Message[];
}
export {};
