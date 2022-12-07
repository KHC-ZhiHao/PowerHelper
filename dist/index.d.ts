import * as _flow from './utils/flow';
import * as _json from './utils/json';
import * as _pick from './utils/pick';
import * as _text from './utils/text';
import * as _array from './utils/array';
import * as _detect from './utils/detect';
import * as _record from './utils/record';
import * as _element from './utils/element';
import * as _calc from './utils/calc';
import { Log as _Log } from './modules/log';
import { I18n as _I18n } from './modules/i18n';
import { Hook as _Hook } from './modules/hook';
import { Event as _Event } from './modules/event';
import { Cache as _Cache } from './modules/cache';
import { Timer as _Timer } from './modules/timer';
import { Loader as _Loader } from './modules/loader';
import { Ticker as _Ticker } from './modules/ticker';
import { Resource as _Resource } from './modules/resource';
import { Reactive as _Reactive } from './modules/reactive';
import { Schedule as _Schedule } from './modules/schedule';
import { Debounce as _Debounce } from './modules/debounce';
import { StyleString as _StyleString } from './modules/style-string';
import { LocalStorage as _LocalStorage } from './modules/local-storage';
import { QueryCollection as _QueryCollection } from './modules/query-collection';
import { ElementListenerGroup as _ElementListenerGroup } from './modules/element-listener-group';
import { WebSocketClient as _WebSocketClient } from './modules/websocket';
import { PromiseOverlap as _PromiseOverlap } from './modules/promise-overlap';
import { CacheLite as _CacheLite } from './modules/cache-lite';
import { Breakpoint as _Breakpoint } from './modules/breakpoint';
import { Exception as _Exception } from './modules/exception';
import { Interaction as _Interaction } from './modules/interaction';
import { Pool as _Pool } from './modules/pool';
/**
 * 負責計算的單元。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/calc.md
 */
export declare const calc: typeof _calc;
/**
 * 精準地提取目標相關資源。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md
 */
export declare const pick: typeof _pick;
/**
 * 流程控制的工具。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md
 */
export declare const flow: typeof _flow;
/**
 * 優雅的 JSON 格式相關處理。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md
 */
export declare const json: typeof _json;
/**
 * 優雅的 JSON 格式相關處理。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md
 */
export declare const text: typeof _text;
/**
 * 優雅的 Array 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md
 */
export declare const array: typeof _array;
/**
 * 優雅的 Object 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md
 */
export declare const record: typeof _record;
/**
 * 驗證當下的執行環境。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md
 */
export declare const detect: typeof _detect;
/**
 * 優雅的 Dom 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md
 */
export declare const element: typeof _element;
export declare type Log = _Log;
export declare type I18n<L extends string, K extends string> = _I18n<L, K>;
export declare type Pool<Params, Data> = _Pool<Params, Data>;
export declare type Hook<Channels extends Record<string, Record<string, any>>> = _Hook<Channels>;
export declare type Event<Channels extends Record<string, Record<string, any>>> = _Event<Channels>;
export declare type Cache<Params, Response> = _Cache<Params, Response>;
export declare type Timer = _Timer;
export declare type Ticker = _Ticker;
export declare type Loader<Data> = _Loader<Data>;
export declare type Schedule = _Schedule;
export declare type Debounce<InputValue> = _Debounce<InputValue>;
export declare type StyleString = _StyleString;
export declare type LocalStorage<Columns extends Record<string, any>> = _LocalStorage<Columns>;
export declare type ElementListenerGroup<El extends Element | Document | Window> = _ElementListenerGroup<El>;
export declare type QueryCollection<Params, Response> = _QueryCollection<Params, Response>;
export declare type WebSocketClient<Pub extends Record<string, any>, Sub> = _WebSocketClient<Pub, Sub>;
export declare type Reactive<Target extends Record<string, any>> = _Reactive<Target>;
export declare type PromiseOverlap<PickType> = _PromiseOverlap<PickType>;
export declare type CacheLite<Handler extends (key: string) => any> = _CacheLite<Handler>;
export declare type Exception = _Exception;
export declare type Breakpoint = _Breakpoint;
export declare type Interaction = _Interaction;
export declare type Resource<Items extends Record<string, (data: any) => string>> = _Resource<Items>;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/log.md
 */
export declare const Log: typeof _Log;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/i18n.md
 */
export declare const I18n: typeof _I18n;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/hook.md
 */
export declare const Hook: typeof _Hook;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/pool.md
 */
export declare const Pool: typeof _Pool;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/event.md
 */
export declare const Event: typeof _Event;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/cache.md
 */
export declare const Cache: typeof _Cache;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/timer.md
 */
export declare const Timer: typeof _Timer;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/ticker.md
 */
export declare const Ticker: typeof _Ticker;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/loader.md
 */
export declare const Loader: typeof _Loader;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/schedule.md
 */
export declare const Schedule: typeof _Schedule;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/debounce.md
 */
export declare const Debounce: typeof _Debounce;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/style-string.md
 */
export declare const StyleString: typeof _StyleString;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/local-storage.md
 */
export declare const LocalStorage: typeof _LocalStorage;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/element-listener-group.md
 */
export declare const ElementListenerGroup: typeof _ElementListenerGroup;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/query-collection.md
 */
export declare const QueryCollection: typeof _QueryCollection;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/websocket.md
 */
export declare const WebSocketClient: typeof _WebSocketClient;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/reactive.md
 */
export declare const Reactive: typeof _Reactive;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/promise-overlap.md
 */
export declare const PromiseOverlap: typeof _PromiseOverlap;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/pcache-lite.md
 */
export declare const CacheLite: typeof _CacheLite;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/breakpoint.md
 */
export declare const Breakpoint: typeof _Breakpoint;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/exception.md
 */
export declare const Exception: typeof _Exception;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/interaction.md
 */
export declare const Interaction: typeof _Interaction;
/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/resource.md
 */
export declare const Resource: typeof _Resource;
export declare const PowerHelper: {
    flow: typeof _flow;
    json: typeof _json;
    text: typeof _text;
    pick: typeof _pick;
    calc: typeof _calc;
    array: typeof _array;
    record: typeof _record;
    detect: typeof _detect;
    element: typeof _element;
    Log: typeof _Log;
    I18n: typeof _I18n;
    Hook: typeof _Hook;
    Pool: typeof _Pool;
    Event: typeof _Event;
    Cache: typeof _Cache;
    Timer: typeof _Timer;
    Ticker: typeof _Ticker;
    Loader: typeof _Loader;
    Schedule: typeof _Schedule;
    Debounce: typeof _Debounce;
    Reactive: typeof _Reactive;
    Resource: typeof _Resource;
    Exception: typeof _Exception;
    CacheLite: typeof _CacheLite;
    Breakpoint: typeof _Breakpoint;
    StyleString: typeof _StyleString;
    Interaction: typeof _Interaction;
    LocalStorage: typeof _LocalStorage;
    PromiseOverlap: typeof _PromiseOverlap;
    QueryCollection: typeof _QueryCollection;
    WebSocketClient: typeof _WebSocketClient;
    ElementListenerGroup: typeof _ElementListenerGroup;
};
export default PowerHelper;
