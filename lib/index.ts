import * as _flow from './utils/flow'
import * as _json from './utils/json'
import * as _array from './utils/array'
import * as _detect from './utils/detect'
import * as _text from './utils/text'

import { Log as _Log } from './modules/log'
import { Event as _Event } from './modules/event'
import { Cache as _Cache } from './modules/cache'
import { Timer as _Timer } from './modules/timer'
import { Ticker as _Ticker } from './modules/ticker'
import { Schedule as _Schedule } from './modules/schedule'
import { LocalStorage as _LocalStorage } from './modules/local-storage'

export const flow = _flow
export const json = _json
export const text = _text
export const array = _array
export const detect = _detect
export const Log = _Log
export const Event = _Event
export const Cache = _Cache
export const Timer = _Timer
export const Ticker = _Ticker
export const Schedule = _Schedule
export const LocalStorage = _LocalStorage
export const PowerHelper = {
    flow,
    json,
    text,
    array,
    detect,
    Log,
    Event,
    Cache,
    Timer,
    Ticker,
    Schedule,
    LocalStorage
}

module.exports = PowerHelper
module.exports.PowerHelper = PowerHelper

export default PowerHelper
