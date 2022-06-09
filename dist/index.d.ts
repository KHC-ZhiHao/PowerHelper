import * as _flow from './utils/flow';
import * as _json from './utils/json';
import * as _pick from './utils/pick';
import * as _text from './utils/text';
import * as _array from './utils/array';
import * as _detect from './utils/detect';
import * as _record from './utils/record';
import * as _element from './utils/element';
import { Log as _Log } from './modules/log';
import { Hook as _Hook } from './modules/hook';
import { Event as _Event } from './modules/event';
import { Cache as _Cache } from './modules/cache';
import { Timer as _Timer } from './modules/timer';
import { Loader as _Loader } from './modules/loader';
import { Ticker as _Ticker } from './modules/ticker';
import { Reactive as _Reactive } from './modules/reactive';
import { Schedule as _Schedule } from './modules/schedule';
import { Debounce as _Debounce } from './modules/debounce';
import { StyleString as _StyleString } from './modules/style-string';
import { LocalStorage as _LocalStorage } from './modules/local-storage';
import { QueryCollection as _QueryCollection } from './modules/query-collection';
import { ElementListenerGroup as _ElementListenerGroup } from './modules/element-listener-group';
import { WebSocketClient as _WebSocketClient } from './modules/websocket';
import { PromiseOverlap as _PromiseOverlap } from './modules/promise-overlap';
export declare const pick: typeof _pick;
export declare const flow: typeof _flow;
export declare const json: typeof _json;
export declare const text: typeof _text;
export declare const array: typeof _array;
export declare const record: typeof _record;
export declare const detect: typeof _detect;
export declare const element: typeof _element;
export declare type Log = _Log;
export declare type Hook<Channels extends Record<string, Record<string, any>>> = _Hook<Channels>;
export declare type Event<Channels extends Record<string, Record<string, any>>> = _Event<Channels>;
export declare type Cache<Params, Response> = _Cache<Params, Response>;
export declare type Timer = _Timer;
export declare type Ticker = _Ticker;
export declare type Loader<Data> = _Loader<Data>;
export declare type Schedule = _Schedule;
export declare type Debounce<InputValue> = _Debounce<InputValue>;
export declare type StyleString = _StyleString;
export declare type LocalStorage<Columns> = _LocalStorage<Columns>;
export declare type ElementListenerGroup<El extends Element | Document | Window> = _ElementListenerGroup<El>;
export declare type QueryCollection<Params, Response> = _QueryCollection<Params, Response>;
export declare type WebSocketClient<Pub, Sub> = _WebSocketClient<Pub, Sub>;
export declare type Reactive<Target extends Record<string, any>> = _Reactive<Target>;
export declare type PromiseOverlap<PickType> = _PromiseOverlap<PickType>;
export declare const Log: typeof _Log;
export declare const Hook: typeof _Hook;
export declare const Event: typeof _Event;
export declare const Cache: typeof _Cache;
export declare const Timer: typeof _Timer;
export declare const Ticker: typeof _Ticker;
export declare const Loader: typeof _Loader;
export declare const Schedule: typeof _Schedule;
export declare const Debounce: typeof _Debounce;
export declare const StyleString: typeof _StyleString;
export declare const LocalStorage: typeof _LocalStorage;
export declare const ElementListenerGroup: typeof _ElementListenerGroup;
export declare const QueryCollection: typeof _QueryCollection;
export declare const WebSocketClient: typeof _WebSocketClient;
export declare const Reactive: typeof _Reactive;
export declare const PromiseOverlap: typeof _PromiseOverlap;
export declare const PowerHelper: {
    flow: typeof _flow;
    json: typeof _json;
    text: typeof _text;
    pick: typeof _pick;
    array: typeof _array;
    record: typeof _record;
    detect: typeof _detect;
    element: typeof _element;
    Log: typeof _Log;
    Hook: typeof _Hook;
    Event: typeof _Event;
    Cache: typeof _Cache;
    Timer: typeof _Timer;
    Ticker: typeof _Ticker;
    Loader: typeof _Loader;
    Schedule: typeof _Schedule;
    Debounce: typeof _Debounce;
    Reactive: typeof _Reactive;
    StyleString: typeof _StyleString;
    LocalStorage: typeof _LocalStorage;
    PromiseOverlap: typeof _PromiseOverlap;
    QueryCollection: typeof _QueryCollection;
    WebSocketClient: typeof _WebSocketClient;
    ElementListenerGroup: typeof _ElementListenerGroup;
};
export default PowerHelper;
