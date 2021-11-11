import { Base } from '../module-base';
export declare class LocalStorage<T extends Record<string, any>> extends Base {
    private namespaces;
    constructor(namespaces: string, dafaultColumns?: Partial<T>);
    static setGlobalLocalStorage(storage: any): void;
    private _genName;
    set<K extends keyof T>(name: K, data: T[K]): void;
    get<K extends keyof T>(name: K): T[K] | undefined;
    clear(): void;
    remove<K extends keyof T>(name: K): void;
}
