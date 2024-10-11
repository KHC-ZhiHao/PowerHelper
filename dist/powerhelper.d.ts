import { Log } from './modules/log';
import { I18n } from './modules/i18n';
import { Hook } from './modules/hook';
import { Once } from './modules/once';
import { Asset } from './modules/asset';
import { Event } from './modules/event';
import { Cache } from './modules/cache';
import { Timer } from './modules/timer';
import { Loader } from './modules/loader';
import { Ticker } from './modules/ticker';
import { Resource } from './modules/resource';
import { Reactive } from './modules/reactive';
import { Schedule } from './modules/schedule';
import { Debounce } from './modules/debounce';
import { JobsQueue } from './modules/jobs-queue';
import { StyleString } from './modules/style-string';
import { LocalStorage } from './modules/local-storage';
import { QueryCollection } from './modules/query-collection';
import { ElementListenerGroup } from './modules/element-listener-group';
import { WebSocketClient } from './modules/websocket';
import { PromiseOverlap } from './modules/promise-overlap';
import { CacheLite } from './modules/cache-lite';
import { Breakpoint } from './modules/breakpoint';
import { Exception } from './modules/exception';
import { Interaction } from './modules/interaction';
import { Pool } from './modules/pool';
import { AsyncLocalStorage } from './modules/async-local-storage';
import { PreloadPort } from './modules/preload-port';
export declare const PowerHelper: {
    flow: {
        run: <T extends () => any>(cb: T) => ReturnType<T>;
        sleep: (ms: number) => Promise<unknown>;
        randomInt: (min: number, max: number) => number;
        createUuid: () => string;
        createWithTsUuid: () => string;
        retry: <T_1>(params: {
            max?: number | undefined;
            onFail?: ((_index: number, _error: any) => void) | undefined;
            interval?: number | undefined;
            action: (_index: number) => Promise<T_1>;
        }) => Promise<T_1>;
        asyncWhile: (cb: (_context: {
            count: number;
            doBreak: () => void;
        }) => Promise<any>) => Promise<void>;
        waitFor: <T_2>(params: {
            interval: number;
            handler: (_resolve: (_value: T_2) => void, _reject: (_error: any) => void) => Promise<void>;
        }) => Promise<T_2>;
    };
    json: {
        jpjs: <T_3>(data: T_3, replacer?: ((key: string, value: any) => any) | undefined) => T_3;
        nonStrictJSONParse: (data: string) => any;
        nonStrictJSONStringify: (data: Record<string, any>) => string;
    };
    text: {
        headMatch: (text: string, match: string) => boolean;
        lastMatch: (text: string, match: string) => boolean;
        byteLength: (text: string) => number;
        replaceVar: <S extends string, E extends string, T_4 extends string>({ start, end, text, vars, defaultVar }: {
            start: S extends "" ? never : S extends import("./types/string").Whitespace ? never : S;
            end: E extends "" ? never : E extends import("./types/string").Whitespace ? never : E;
            text: T_4;
            vars: Partial<import("./types/string").VarParameters<S, E, T_4>>;
            defaultVar?: string | undefined;
        }) => string;
        format: (format: string, text: string, def?: string) => string;
        findMatchOrLast: <T_5 extends string>(target: string, keys: T_5[]) => T_5;
    };
    pick: {
        ifBad: <T_6>(data: T_6 | Error | null | undefined, def: T_6) => T_6 | Error | null | undefined;
        ifEmpty: <T_7>(data: T_7 | null | undefined, def: T_7) => T_7;
        getType: (target: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "empty" | "array" | "NaN" | "regexp" | "promise" | "buffer" | "error";
        peel: <T_8 extends Record<string, any> = Record<"", any>, C extends string = "", R = import("./types/pick").PeelType<C, T_8>>(target: T_8, path: C) => C extends "" ? T_8 : R | null;
        vars: <S_1 extends string, E_1 extends string, T_9 extends string>({ start, end, text }: {
            start: S_1 extends "" ? never : S_1 extends import("./types/string").Whitespace ? never : S_1;
            end: E_1 extends "" ? never : E_1 extends import("./types/string").Whitespace ? never : E_1;
            text: T_9;
        }) => (keyof import("./types/string").VarParameters<S_1, E_1, T_9> extends never ? string : keyof import("./types/string").VarParameters<S_1, E_1, T_9>)[];
    };
    calc: {
        toMs: (unit: "y" | "d" | "h" | "m" | "s", value: number) => number;
    };
    array: {
        groups: <T_10>(size: number, items: T_10[]) => T_10[][];
        randomPick: <T_11>(items: T_11[]) => T_11;
        randomPicks: <T_12>(take: number, items: T_12[]) => T_12[];
        unique: <T_13 extends any[]>(items: T_13) => T_13;
        asyncMap: <T_14, R_1>(items: T_14[], cb: (_item: T_14) => Promise<R_1>) => Promise<R_1[]>;
        check: <T_15>(items: T_15[], value: T_15) => T_15[];
    };
    record: {
        setMapValue: <T_16 extends unknown>(template: T_16, target: unknown, options?: {
            directReplacePeels?: string[] | undefined;
        } | undefined) => T_16;
        createStrictObject: <T_17 extends {
            [key: string]: [StringConstructor | BooleanConstructor | NumberConstructor, boolean, unknown, any?];
        }>(envs: T_17) => import("./types/record").DeepReadonly<{ [key in keyof T_17]: T_17[key][0] extends StringConstructor ? string : T_17[key][0] extends NumberConstructor ? number : T_17[key][0] extends BooleanConstructor ? boolean : unknown; }>;
        omit: <D extends object, T_18 extends (keyof D)[]>(data: D, keys: T_18) => Omit<D, T_18[0]>;
        promiseAllWithKeys: <T_19 extends Record<string, Promise<any>>>(obj: T_19) => Promise<{ [K in keyof T_19]: T_19[K] extends Promise<infer U> ? U : never; }>;
        simpleCheckDeepDiff: <T_20 extends Record<string, any>>(a: T_20, b: T_20) => boolean;
    };
    detect: {
        inAppBrowser: () => boolean;
        inMobile: () => boolean;
        inIOS: () => boolean;
        inAndroid: () => boolean;
        inSafari: () => boolean;
    };
    checker: {
        inputAccept: (targetType: string, fileType: string, fileName?: string | undefined) => boolean;
    };
    element: {
        importScript: (url: string, options?: {
            appendBefore?: ((_el: HTMLScriptElement) => void) | undefined;
        } | undefined) => Promise<unknown>;
        createAndAppend: <T_21 extends keyof HTMLElementTagNameMap>(tag: T_21, cb: (el: HTMLElementTagNameMap[T_21]) => any, target?: HTMLElement | undefined) => HTMLElementTagNameMap[T_21];
        importCss: (url: string, options?: {
            appendBefore?: ((_el: HTMLLinkElement) => void) | undefined;
        } | undefined) => Promise<unknown>;
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
