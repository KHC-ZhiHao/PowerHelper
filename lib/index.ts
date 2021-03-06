import * as _flow from './utils/flow'
import * as _json from './utils/json'
import * as _pick from './utils/pick'
import * as _text from './utils/text'
import * as _array from './utils/array'
import * as _detect from './utils/detect'
import * as _record from './utils/record'
import * as _element from './utils/element'

import { Log as _Log } from './modules/log'
import { Hook as _Hook } from './modules/hook'
import { Event as _Event } from './modules/event'
import { Cache as _Cache } from './modules/cache'
import { Timer as _Timer } from './modules/timer'
import { Loader as _Loader } from './modules/loader'
import { Ticker as _Ticker } from './modules/ticker'
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

export const pick = _pick
export const flow = _flow
export const json = _json
export const text = _text
export const array = _array
export const record = _record
export const detect = _detect
export const element = _element

export type Log = _Log
export type Hook<Channels extends Record<string, Record<string, any>>> = _Hook<Channels>
export type Event<Channels extends Record<string, Record<string, any>>> = _Event<Channels>
export type Cache<Params, Response> = _Cache<Params, Response>
export type Timer = _Timer
export type Ticker = _Ticker
export type Loader<Data> = _Loader<Data>
export type Schedule = _Schedule
export type Debounce<InputValue> = _Debounce<InputValue>
export type StyleString = _StyleString
export type LocalStorage<Columns> = _LocalStorage<Columns>
export type ElementListenerGroup<El extends Element | Document | Window> = _ElementListenerGroup<El>
export type QueryCollection<Params, Response> = _QueryCollection<Params, Response>
export type WebSocketClient<Pub, Sub> = _WebSocketClient<Pub, Sub>
export type Reactive<Target extends Record<string, any>> = _Reactive<Target>
export type PromiseOverlap<PickType> = _PromiseOverlap<PickType>
export type CacheLite<Handler extends (key: string) => any> = _CacheLite<Handler>

export const Log = _Log
export const Hook = _Hook
export const Event = _Event
export const Cache = _Cache
export const Timer = _Timer
export const Ticker = _Ticker
export const Loader = _Loader
export const Schedule = _Schedule
export const Debounce = _Debounce
export const StyleString = _StyleString
export const LocalStorage = _LocalStorage
export const ElementListenerGroup = _ElementListenerGroup
export const QueryCollection = _QueryCollection
export const WebSocketClient = _WebSocketClient
export const Reactive = _Reactive
export const PromiseOverlap = _PromiseOverlap
export const CacheLite = _CacheLite

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
    Hook,
    Event,
    Cache,
    Timer,
    Ticker,
    Loader,
    Schedule,
    Debounce,
    Reactive,
    CacheLite,
    StyleString,
    LocalStorage,
    PromiseOverlap,
    QueryCollection,
    WebSocketClient,
    ElementListenerGroup
}

module.exports = PowerHelper
module.exports.PowerHelper = PowerHelper

export default PowerHelper
