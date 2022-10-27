import { Event } from './event';
declare type StepTypes = 'step' | 'wrong' | 'notify' | 'fail';
declare type StepLevel = 'info' | 'warning' | 'danger' | 'success';
declare type Step = {
    type: StepTypes;
    meta?: any;
    level: StepLevel;
    message: string;
    createdAt: number;
    checkoutAt: string;
};
declare type Channels = {
    action: Step;
};
declare type Params = {
    name: string;
    stepMaxSize?: number;
    interceptorMessage?: (_data: any) => string;
};
export declare class Interaction extends Event<Channels> {
    protected name: string;
    protected steps: Step[];
    protected parent?: Interaction;
    protected stepMaxSize: number;
    protected interceptorMessage: NonNullable<Params['interceptorMessage']>;
    constructor({ name, interceptorMessage, stepMaxSize }: Params);
    get fullName(): string;
    private pushStep;
    /**
     * 迭代每個階段訊息
     */
    each(cb: (_step: Step, _index: number) => void): void;
    /**
     * 增加一個階段訊息
     */
    step(message: string, meta?: any): void;
    /**
     * 發出錯誤的訊息，並回傳一組錯誤
     */
    fail(message: string, error: any): Error;
    /**
     * 發出錯誤的訊息，通常表示於整個應用程式發生錯誤
     */
    wrong(message: any): void;
    /**
     * 切出一個分支有利於追蹤
     */
    checkout(name: string): Pick<Interaction, 'wrong' | 'notify' | 'checkout' | 'step' | 'fail'>;
    /**
     * 發出通知的訊息
     */
    notify(type: 'info' | 'warning' | 'danger' | 'success', content: any): void;
}
export {};
