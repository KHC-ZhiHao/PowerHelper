import { Log } from './modules/log.js';
import { I18n } from './modules/i18n.js';
import { Hook } from './modules/hook.js';
import { Once } from './modules/once.js';
import { Asset } from './modules/asset.js';
import { Event } from './modules/event.js';
import { Cache } from './modules/cache.js';
import { Timer } from './modules/timer.js';
import { Loader } from './modules/loader.js';
import { Ticker } from './modules/ticker.js';
import { Resource } from './modules/resource.js';
import { Reactive } from './modules/reactive.js';
import { Schedule } from './modules/schedule.js';
import { Debounce } from './modules/debounce.js';
import { JobsQueue } from './modules/jobs-queue.js';
import { StyleString } from './modules/style-string.js';
import { LocalStorage } from './modules/local-storage.js';
import { QueryCollection } from './modules/query-collection.js';
import { ElementListenerGroup } from './modules/element-listener-group.js';
import { WebSocketClient } from './modules/websocket.js';
import { PromiseOverlap } from './modules/promise-overlap.js';
import { CacheLite } from './modules/cache-lite.js';
import { Breakpoint } from './modules/breakpoint.js';
import { Exception } from './modules/exception.js';
import { Interaction } from './modules/interaction.js';
import { Pool } from './modules/pool.js';
import { AsyncLocalStorage } from './modules/async-local-storage.js';
import { PreloadPort } from './modules/preload-port.js';
export declare const PowerHelper: {
    flow: {
        run: <T extends () => any>(cb: T) => ReturnType<T>;
        sleep: (ms: number) => Promise<unknown>;
        randomInt: (min: number, max: number) => number;
        createUuid: () => string;
        createWithTsUuid: () => string;
        retry: <T>(params: {
            max?: number;
            onFail?: (_index: number, _error: any) => void;
            interval?: number;
            action: (_index: number) => Promise<T>;
        }) => Promise<T>;
        asyncWhile: (cb: (_context: {
            count: number;
            doBreak: () => void;
        }) => Promise<any>) => Promise<void>;
        waitFor: <T>(params: {
            interval: number;
            handler: (_resolve: (_value: T) => void, _reject: (_error: any) => void) => Promise<void>;
        }) => Promise<T>;
    };
    json: {
        jpjs: <T>(data: T, replacer?: (key: string, value: any) => any) => T;
        nonStrictJSONParse: (data: string) => any;
        nonStrictJSONStringify: (data: Record<string, any>) => string;
    };
    text: {
        headMatch: (text: string, match: string) => boolean;
        lastMatch: (text: string, match: string) => boolean;
        byteLength: (text: string) => number;
        replaceVar: <S extends string, E extends string, T extends string>({ start, end, text, vars, defaultVar }: {
            start: S extends "" ? never : S extends import("./types/string.js").Whitespace ? never : S;
            end: E extends "" ? never : E extends import("./types/string.js").Whitespace ? never : E;
            text: T;
            vars: Partial<import("./types/string.js").VarParameters<S, E, T>>;
            defaultVar?: string;
        }) => string;
        format: (format: string, text: string, def?: string) => string;
        findMatchOrLast: <T extends string>(target: string, keys: T[]) => T;
        pickInTagContents: (params: {
            text: string;
            start: string;
            end: string;
        }) => string[];
        removeInTagContents(params: {
            text: string;
            start: string;
            end: string;
        }): string;
    };
    pick: {
        ifBad: <T>(data: T | undefined | null | Error, def: T) => Error | T | null | undefined;
        ifEmpty: <T>(data: T | undefined | null, def: T) => T;
        getType: (target: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "empty" | "array" | "NaN" | "regexp" | "promise" | "buffer" | "error";
        peel: <T extends Record<string, any> = Record<"", any>, C extends string = "", R = import("./types/pick.js").PeelType<C, T>>(target: T, path: C) => C extends "" ? T : (R | null);
        vars: <S extends string, E extends string, T extends string>({ start, end, text }: {
            start: S extends "" ? never : S extends import("./types/string.js").Whitespace ? never : S;
            end: E extends "" ? never : E extends import("./types/string.js").Whitespace ? never : E;
            text: T;
        }) => (keyof import("./types/string.js").VarParameters<S, E, T> extends never ? string : keyof import("./types/string.js").VarParameters<S, E, T>)[];
    };
    calc: {
        toMs: (unit: "y" | "d" | "h" | "m" | "s", value: number) => number;
    };
    array: {
        groups: <T>(size: number, items: T[]) => T[][];
        randomPick: <T>(items: T[]) => T;
        randomPicks: <T>(take: number, items: T[]) => T[];
        unique: <T extends Array<any>>(items: T) => T;
        asyncMap: <T, R>(items: T[], cb: (_item: T) => Promise<R>) => Promise<R[]>;
        check: <T>(items: T[], value: T) => T[];
    };
    record: {
        setMapValue: <T extends unknown>(template: T, target: unknown, options?: {
            directReplacePeels?: string[];
        }) => T;
        createStrictObject: <T extends {
            [key: string]: [StringConstructor | BooleanConstructor | NumberConstructor, boolean, unknown, any?];
        }>(envs: T) => import("./types/record.js").DeepReadonly<{ [key in keyof T]: T[key][0] extends typeof String ? string : (T[key][0] extends typeof Number ? number : (T[key][0] extends typeof Boolean ? boolean : unknown)); }>;
        omit: <D extends object, T extends (keyof D)[]>(data: D, keys: T) => Omit<D, T[0]>;
        promiseAllWithKeys: <T extends Record<string, Promise<any>>>(obj: T) => Promise<{ [K in keyof T]: T[K] extends Promise<infer U> ? U : never; }>;
        simpleCheckDeepDiff: <T extends Record<string, any>>(a: T, b: T) => boolean;
    };
    detect: {
        inAppBrowser: () => boolean;
        inMobile: () => boolean;
        inIOS: () => boolean;
        inAndroid: () => boolean;
        inSafari: () => boolean;
    };
    checker: {
        inputAccept: (targetType: string, fileType: string, fileName?: string) => boolean;
    };
    element: {
        importScript: (url: string, options?: {
            appendBefore?: (_el: HTMLScriptElement) => void;
        }) => Promise<unknown>;
        createAndAppend: <T extends keyof HTMLElementTagNameMap>(tag: T, cb: (el: HTMLElementTagNameMap[T]) => any, target?: HTMLElement) => HTMLElementTagNameMap[T];
        importCss: (url: string, options?: {
            appendBefore?: (_el: HTMLLinkElement) => void;
        }) => Promise<unknown>;
    };
    Log: typeof Log;
    I18n: typeof I18n;
    Hook: typeof Hook;
    Pool: typeof Pool;
    Once: typeof Once;
    Asset: typeof Asset;
    Event: typeof Event;
    Cache: typeof Cache;
    Timer: typeof Timer;
    Ticker: typeof Ticker;
    Loader: typeof Loader;
    Schedule: typeof Schedule;
    Debounce: typeof Debounce;
    Reactive: typeof Reactive;
    Resource: typeof Resource;
    Exception: typeof Exception;
    CacheLite: typeof CacheLite;
    JobsQueue: typeof JobsQueue;
    Breakpoint: typeof Breakpoint;
    StyleString: typeof StyleString;
    PreloadPort: typeof PreloadPort;
    Interaction: typeof Interaction;
    LocalStorage: typeof LocalStorage;
    PromiseOverlap: typeof PromiseOverlap;
    QueryCollection: typeof QueryCollection;
    WebSocketClient: typeof WebSocketClient;
    AsyncLocalStorage: typeof AsyncLocalStorage;
    ElementListenerGroup: typeof ElementListenerGroup;
};
