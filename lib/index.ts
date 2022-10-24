/* eslint-disable no-redeclare */

import * as _flow from './utils/flow'
import * as _json from './utils/json'
import * as _pick from './utils/pick'
import * as _text from './utils/text'
import * as _array from './utils/array'
import * as _detect from './utils/detect'
import * as _record from './utils/record'
import * as _element from './utils/element'

import { Log as _Log } from './modules/log'
import { I18n as _I18n } from './modules/i18n'
import { Hook as _Hook } from './modules/hook'
import { Event as _Event } from './modules/event'
import { Cache as _Cache } from './modules/cache'
import { Timer as _Timer } from './modules/timer'
import { Loader as _Loader } from './modules/loader'
import { Ticker as _Ticker } from './modules/ticker'
import { Resource as _Resource } from './modules/resource'
import { Reactive as _Reactive } from './modules/reactive'
import { Schedule as _Schedule } from './modules/schedule'
import { Debounce as _Debounce } from './modules/debounce'
import { StyleString as _StyleString } from './modules/style-string'
import { LocalStorage as _LocalStorage } from './modules/local-storage'
import { QueryCollection as _QueryCollection } from './modules/query-collection'
import { ElementListenerGroup as _ElementListenerGroup } from './modules/element-listener-group'
import { WebSocketClient as _WebSocketClient } from './modules/websocket'
import { PromiseOverlap as _PromiseOverlap } from './modules/promise-overlap'
import { CacheLite as _CacheLite } from './modules/cache-lite'
import { Breakpoint as _Breakpoint } from './modules/breakpoint'
import { Exception as _Exception } from './modules/exception'
import { Interaction as _Interaction } from './modules/interaction'
import { Pool as _Pool } from './modules/pool'

/**
 * 精準地提取目標相關資源。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/pick.md
 */

export const pick = _pick

/**
 * 流程控制的工具。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/flow.md
 */

export const flow = _flow

/**
 * 優雅的 JSON 格式相關處理。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/json.md
 */

export const json = _json

/**
 * 優雅的 JSON 格式相關處理。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/text.md
 */

export const text = _text

/**
 * 優雅的 Array 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/array.md
 */

export const array = _array

/**
 * 優雅的 Object 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/record.md
 */

export const record = _record

/**
 * 驗證當下的執行環境。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/detect.md
 */

export const detect = _detect

/**
 * 優雅的 Dom 操作。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/utils/element.md
 */

export const element = _element

export type Log = _Log
export type I18n<L extends string, K extends string> = _I18n<L, K>
export type Pool<Params, Data> = _Pool<Params, Data>
export type Hook<Channels extends Record<string, Record<string, any>>> = _Hook<Channels>
export type Event<Channels extends Record<string, Record<string, any>>> = _Event<Channels>
export type Cache<Params, Response> = _Cache<Params, Response>
export type Timer = _Timer
export type Ticker = _Ticker
export type Loader<Data> = _Loader<Data>
export type Schedule = _Schedule
export type Debounce<InputValue> = _Debounce<InputValue>
export type StyleString = _StyleString
export type LocalStorage<Columns extends Record<string, any>> = _LocalStorage<Columns>
export type ElementListenerGroup<El extends Element | Document | Window> = _ElementListenerGroup<El>
export type QueryCollection<Params, Response> = _QueryCollection<Params, Response>
export type WebSocketClient<Pub extends Record<string, any>, Sub> = _WebSocketClient<Pub, Sub>
export type Reactive<Target extends Record<string, any>> = _Reactive<Target>
export type PromiseOverlap<PickType> = _PromiseOverlap<PickType>
export type CacheLite<Handler extends (key: string) => any> = _CacheLite<Handler>
export type Exception = _Exception
export type Breakpoint = _Breakpoint
export type Interaction = _Interaction
export type Resource = _Resource

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/log.md
 */

export const Log = _Log

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/i18n.md
 */

export const I18n = _I18n

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/hook.md
 */

export const Hook = _Hook

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/pool.md
 */

export const Pool = _Pool

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/event.md
 */

export const Event = _Event

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/cache.md
 */

export const Cache = _Cache

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/timer.md
 */

export const Timer = _Timer

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/ticker.md
 */

export const Ticker = _Ticker

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/loader.md
 */

export const Loader = _Loader

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/schedule.md
 */

export const Schedule = _Schedule

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/debounce.md
 */

export const Debounce = _Debounce

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/style-string.md
 */

export const StyleString = _StyleString

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/local-storage.md
 */

export const LocalStorage = _LocalStorage

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/element-listener-group.md
 */

export const ElementListenerGroup = _ElementListenerGroup

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/query-collection.md
 */

export const QueryCollection = _QueryCollection

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/websocket.md
 */

export const WebSocketClient = _WebSocketClient

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/reactive.md
 */

export const Reactive = _Reactive

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/promise-overlap.md
 */

export const PromiseOverlap = _PromiseOverlap

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/pcache-lite.md
 */

export const CacheLite = _CacheLite

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/breakpointmd
 */

export const Breakpoint = _Breakpoint

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/exception
 */

export const Exception = _Exception

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/interaction
 */

export const Interaction = _Interaction

/**
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/resource
 */

export const Resource = _Resource

export const PowerHelper = {
    flow,
    json,
    text,
    pick,
    array,
    record,
    detect,
    element,
    Log,
    I18n,
    Hook,
    Pool,
    Event,
    Cache,
    Timer,
    Ticker,
    Loader,
    Schedule,
    Debounce,
    Reactive,
    Resource,
    Exception,
    CacheLite,
    Breakpoint,
    StyleString,
    Interaction,
    LocalStorage,
    PromiseOverlap,
    QueryCollection,
    WebSocketClient,
    ElementListenerGroup
}

module.exports = PowerHelper
module.exports.PowerHelper = PowerHelper

export default PowerHelper
