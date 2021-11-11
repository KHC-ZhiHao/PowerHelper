import { Base } from '../module-base';
export declare class Cache<T> extends Base {
    private event;
    private pick;
    private keepAlive;
    private items;
    constructor(params: {
        pick: (key: string) => Promise<T>;
        keepAlive?: number;
    });
    keys(): string[];
    clear(): void;
    remove(key: string): void;
    set(key: string, data: T): void;
    get(key: string): Promise<T>;
}
