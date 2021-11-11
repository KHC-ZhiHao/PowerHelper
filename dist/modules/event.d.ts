import { Base } from '../module-base';
declare type ListenerContext<T> = {
    id: string;
    off: () => void;
    data: T;
    state: Record<string, any>;
};
declare type ListenerCallback<T> = (context: ListenerContext<T>) => void;
declare class Listener<T> {
    readonly id: string;
    readonly state: Record<string, any>;
    readonly channel: string;
    private callback;
    private manager;
    constructor(manager: Event<any>, channel: string, callback: ListenerCallback<any>);
    invoke(data: T): void;
    off(): void;
}
export declare class Event<T extends Record<string, Record<string, any>>> extends Base {
    listeners: Map<string, Listener<any>[]>;
    constructor();
    getChannelListenerSize<K extends keyof T>(channel: K): number;
    emit<K extends keyof T>(channel: K, data: T[K]): void;
    off<K extends keyof T>(channel: K, id: string): void;
    on<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>): Listener<T[K]>;
    once<K extends keyof T>(channel: K, callback: ListenerCallback<T[K]>): Listener<T[string]>;
}
export {};
