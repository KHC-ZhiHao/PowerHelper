import { flow } from './utils/flow'
import { json } from './utils/json'
import { pick } from './utils/pick'
import { text } from './utils/text'
import { array } from './utils/array'
import { detect } from './utils/detect'
import { record } from './utils/record'
import { element } from './utils/element'
import { calc } from './utils/calc'
import { checker } from './utils/checker'

import { Log } from './modules/log'
import { I18n } from './modules/i18n'
import { Hook } from './modules/hook'
import { Once } from './modules/once'
import { Asset } from './modules/asset'
import { Event } from './modules/event'
import { Cache } from './modules/cache'
import { Timer } from './modules/timer'
import { Loader } from './modules/loader'
import { Ticker } from './modules/ticker'
import { Resource } from './modules/resource'
import { Reactive } from './modules/reactive'
import { Schedule } from './modules/schedule'
import { Debounce } from './modules/debounce'
import { JobsQueue } from './modules/jobs-queue'
import { StyleString } from './modules/style-string'
import { LocalStorage } from './modules/local-storage'
import { QueryCollection } from './modules/query-collection'
import { ElementListenerGroup } from './modules/element-listener-group'
import { WebSocketClient } from './modules/websocket'
import { PromiseOverlap } from './modules/promise-overlap'
import { CacheLite } from './modules/cache-lite'
import { Breakpoint } from './modules/breakpoint'
import { Exception } from './modules/exception'
import { Interaction } from './modules/interaction'
import { Pool } from './modules/pool'
import { AsyncLocalStorage } from './modules/async-local-storage'
import { PreloadPort } from './modules/preload-port'

export const PowerHelper = {
    flow,
    json,
    text,
    pick,
    calc,
    array,
    record,
    detect,
    checker,
    element,
    Log,
    I18n,
    Hook,
    Pool,
    Once,
    Asset,
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
    JobsQueue,
    Breakpoint,
    StyleString,
    PreloadPort,
    Interaction,
    LocalStorage,
    PromiseOverlap,
    QueryCollection,
    WebSocketClient,
    AsyncLocalStorage,
    ElementListenerGroup
}
