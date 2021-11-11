import './types/date';
import './types/pick';
import './types/string-params';
import * as flow from './utils/flow';
import * as json from './utils/json';
import * as detect from './utils/detect';
import { Log } from './modules/log';
import { Event } from './modules/event';
import { Cache } from './modules/cache';
import { Timer } from './modules/timer';
import { Ticker } from './modules/ticker';
import { Schedule } from './modules/schedule';
import { LocalStorage } from './modules/local-storage';
export declare const PowerHelper: {
    utils: {
        flow: typeof flow;
        json: typeof json;
        detect: typeof detect;
    };
    modules: {
        Log: typeof Log;
        Event: typeof Event;
        Cache: typeof Cache;
        Timer: typeof Timer;
        Ticker: typeof Ticker;
        Schedule: typeof Schedule;
        LocalStorage: typeof LocalStorage;
    };
};
export default PowerHelper;
