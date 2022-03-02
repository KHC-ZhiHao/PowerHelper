import * as _flow from './utils/flow'
import * as _json from './utils/json'
import * as _array from './utils/array'
import * as _detect from './utils/detect'
import * as _pick from './utils/pick'
import * as _text from './utils/text'
import * as _element from './utils/element'

import { Log as _Log } from './modules/log'
import { Event as _Event } from './modules/event'
import { Cache as _Cache } from './modules/cache'
import { Timer as _Timer } from './modules/timer'
import { Ticker as _Ticker } from './modules/ticker'
import { Schedule as _Schedule } from './modules/schedule'
import { Debounce as _Debounce } from './modules/debounce'
import { StyleString as _StyleString } from './modules/style-string'
import { LocalStorage as _LocalStorage } from './modules/local-storage'
import { QueryCollection as _QueryCollection } from './modules/query-collection'
import { ElementListenerGroup as _ElementListenerGroup } from './modules/element-listener-group'
import { WebSocketClient as _WebSocketClient } from './modules/websocket'

export const pick = _pick
export const flow = _flow
export const json = _json
export const text = _text
export const array = _array
export const detect = _detect
export const element = _element

export type Log = _Log

export const Log = _Log
export const Event = _Event
export const Cache = _Cache
export const Timer = _Timer
export const Ticker = _Ticker
export const Schedule = _Schedule
export const Debounce = _Debounce
export const StyleString = _StyleString
export const LocalStorage = _LocalStorage
export const ElementListenerGroup = _ElementListenerGroup
export const QueryCollection = _QueryCollection
export const WebSocketClient = _WebSocketClient

export const PowerHelper = {
    flow,
    json,
    text,
    pick,
    array,
    detect,
    element,
    Log,
    Event,
    Cache,
    Timer,
    Ticker,
    Schedule,
    Debounce,
    StyleString,
    LocalStorage,
    QueryCollection,
    WebSocketClient,
    ElementListenerGroup
}

module.exports = PowerHelper
module.exports.PowerHelper = PowerHelper

export default PowerHelper
