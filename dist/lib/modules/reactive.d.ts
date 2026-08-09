import { Event } from './event.js';
type Events<S> = {
    actionBefore: ActionContext<S>;
    actionAfter: ActionContext<S>;
};
type ActionContext<S> = {
    state: S;
    newKey: string;
    oldKey: string | null;
};
type NextTickCallback<S> = (_state: S) => void;
type ReactiveParams<S> = {
    /** 每次輪詢時間(毫秒)，預設 100 ms */
    schedule?: number;
    /** 透過長輪詢回傳指定的 key */
    action: (_context: ActionContext<S> & {
        close: () => void;
    }) => Promise<any>;
    /** 如果 observable 回傳的 key 有改動則觸發 */
    observable: (_state: S) => Promise<string>;
};
/**
 * 透過輪詢的方法監聽物件有沒有發生變動。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/reactive.md
 */
export declare class Reactive<S extends Record<string, any>> extends Event<Events<S>> {
    private state;
    private oldKey;
    private params;
    private schedule;
    private installed;
    private nextTicks;
    constructor(params: ReactiveParams<S>);
    /** 是否觸發過 from */
    isActive(): boolean;
    /** 關閉輪詢 */
    close(): void;
    /** 在下一次輪詢時觸發 */
    nextTick(cb: NextTickCallback<S>): void;
    /** 指定監聽對象 */
    from(data: S): Promise<this>;
    /** 觸發驗證是否改變了 key 值，如果改變則執行 action */
    private dispatch;
    /** 執行 action */
    private trigger;
}
export {};
