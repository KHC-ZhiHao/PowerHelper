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
    };
    json: {
        jpjs: <T_2>(data: T_2) => T_2;
        nonStrictJSONParse: (data: string) => any;
        nonStrictJSONStringify: (data: Record<string, any>) => string;
    };
    text: {
        headMatch: (text: string, match: string) => boolean;
        lastMatch: (text: string, match: string) => boolean;
        byteLength: (text: string) => number;
        replaceVar: <S extends string, E extends string, T_3 extends string>({ start, end, text, vars, dafaultVar }: {
            start: S extends "" ? never : S extends import("./types/string").Whitespace ? never : S;
            end: E extends "" ? never : E extends import("./types/string").Whitespace ? never : E;
            text: T_3;
            vars: Partial<import("./types/string").VarParameters<S, E, T_3>>;
            dafaultVar?: string | undefined;
        }) => string;
        format: (format: string, text: string, def?: string) => string;
        findMatchOrLast: <T_4 extends string>(target: string, keys: T_4[]) => T_4;
    };
    pick: {
        ifBad: <T_5>(data: T_5 | Error | null | undefined, def: T_5) => T_5 | Error | null | undefined;
        ifEmpty: <T_6>(data: T_6 | null | undefined, def: T_6) => T_6;
        getType: (target: any) => "string" | "number" | "bigint" | "boolean" | "symbol" | "object" | "function" | "empty" | "array" | "NaN" | "regexp" | "promise" | "buffer" | "error";
        peel: <T_7 extends Record<string, any> = Record<"", any>, C extends string = "", R = import("./types/pick").PeelType<C, T_7>>(target: T_7, path: C) => C extends "" ? T_7 : R | null;
        vars: <S_1 extends string, E_1 extends string, T_8 extends string>({ start, end, text }: {
            start: S_1 extends "" ? never : S_1 extends import("./types/string").Whitespace ? never : S_1;
            end: E_1 extends "" ? never : E_1 extends import("./types/string").Whitespace ? never : E_1;
            text: T_8;
        }) => (keyof import("./types/string").VarParameters<S_1, E_1, T_8> extends never ? string : keyof import("./types/string").VarParameters<S_1, E_1, T_8>)[];
    };
    calc: {
        toMs: (unit: "y" | "d" | "h" | "m" | "s", value: number) => number;
    };
    array: {
        groups: <T_9>(size: number, items: T_9[]) => T_9[][];
        randomPick: <T_10>(items: T_10[]) => T_10;
        randomPicks: <T_11>(take: number, items: T_11[]) => T_11[];
        unique: <T_12 extends any[]>(items: T_12) => T_12;
        asyncMap: <T_13, R_1>(items: T_13[], cb: (_item: T_13) => Promise<R_1>) => Promise<R_1[]>;
        check: <T_14>(items: T_14[], value: T_14) => T_14[];
    };
    record: {
        setMapValue: <T_15 extends unknown>(template: T_15, target: unknown, options?: {
            directReplacePeels?: string[] | undefined;
        } | undefined) => T_15;
        createStrictObject: <T_16 extends {
            [key: string]: [StringConstructor | BooleanConstructor | NumberConstructor, boolean, unknown, any?];
        }>(envs: T_16) => import("./types/record").DeepReadonly<{ [key in keyof T_16]: T_16[key][0] extends StringConstructor ? string : T_16[key][0] extends NumberConstructor ? number : T_16[key][0] extends BooleanConstructor ? boolean : unknown; }>;
        omit: <D extends object, T_17 extends (keyof D)[]>(data: D, keys: T_17) => Omit<D, T_17[0]>;
        promiseAllWithKeys: <T_18 extends Record<string, Promise<any>>>(obj: T_18) => Promise<{ [K in keyof T_18]: T_18[K] extends Promise<infer U> ? U : never; }>;
        simpleCheckDeepDiff: <T_19 extends Record<string, any>>(a: T_19, b: T_19) => boolean;
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
        createAndAppend: <T_20 extends keyof HTMLElementTagNameMap>(tag: T_20, cb: (el: HTMLElementTagNameMap[T_20]) => any, target?: HTMLElement | undefined) => HTMLElementTagNameMap[T_20];
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
    Interaction: typeof Interaction;
    LocalStorage: typeof LocalStorage;
    PromiseOverlap: typeof PromiseOverlap;
    QueryCollection: typeof QueryCollection;
    WebSocketClient: typeof WebSocketClient;
    AsyncLocalStorage: typeof AsyncLocalStorage;
    ElementListenerGroup: typeof ElementListenerGroup;
};
