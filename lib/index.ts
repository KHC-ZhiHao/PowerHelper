import './types/date'
import './types/pick'
import './types/string-params'

import * as flow from './utils/flow'
import * as json from './utils/json'
import * as detect from './utils/detect'
import { Log } from './modules/log'
import { Event } from './modules/event'
import { Cache } from './modules/cache'
import { Timer } from './modules/timer'
import { Ticker } from './modules/ticker'
import { Schedule } from './modules/schedule'
import { LocalStorage } from './modules/local-storage'

export const PowerHelper = {
    utils: {
        flow,
        json,
        detect
    },
    modules: {
        Log,
        Event,
        Cache,
        Timer,
        Ticker,
        Schedule,
        LocalStorage
    }
}

module.exports = PowerHelper
module.exports.PowerHelper = PowerHelper

export default PowerHelper
