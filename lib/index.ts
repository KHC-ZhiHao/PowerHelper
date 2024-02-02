/* eslint-disable no-redeclare */

export { text } from './utils/text'
export { json } from './utils/json'
export { flow } from './utils/flow'
export { pick } from './utils/pick'
export { calc } from './utils/calc'
export { array } from './utils/array'
export { record } from './utils/record'
export { detect } from './utils/detect'
export { checker } from './utils/checker'
export { element } from './utils/element'

export { Log } from './modules/log'
export { I18n } from './modules/i18n'
export { Hook } from './modules/hook'
export { Event } from './modules/event'
export { Cache } from './modules/cache'
export { Timer } from './modules/timer'
export { Loader } from './modules/loader'
export { Ticker } from './modules/ticker'
export { Resource } from './modules/resource'
export { Reactive } from './modules/reactive'
export { Schedule } from './modules/schedule'
export { Debounce } from './modules/debounce'
export { JobsQueue } from './modules/jobs-queue'
export { StyleString } from './modules/style-string'
export { LocalStorage } from './modules/local-storage'
export { QueryCollection } from './modules/query-collection'
export { ElementListenerGroup } from './modules/element-listener-group'
export { WebSocketClient } from './modules/websocket'
export { PromiseOverlap } from './modules/promise-overlap'
export { CacheLite } from './modules/cache-lite'
export { Breakpoint } from './modules/breakpoint'
export { Exception } from './modules/exception'
export { Interaction } from './modules/interaction'
export { Pool } from './modules/pool'
export { Once } from './modules/once'
export { Asset } from './modules/asset'
export type * as AssetTypes from './modules/asset'
export { AsyncLocalStorage } from './modules/async-local-storage'

export type * as TDate from './types/date'
export type * as TPick from './types/pick'
export type * as TRecord from './types/record'
export type * as TString from './types/string'

export { PowerHelper } from './powerhelper'
import { PowerHelper } from './powerhelper'

module.exports = PowerHelper
module.exports.PowerHelper = PowerHelper

export default PowerHelper
