import { Event } from './event';
declare type Pub = Record<string, any>;
declare type FailTypes = 'unknown' | 'send' | 'message';
declare type Events = {
    /** 成功連接伺服器時觸發。 */
    $open: any;
    /** 連接失敗等狀態等觸發。 */
    $error: {
        from: FailTypes;
        error: any;
    };
    /** 連接關閉時觸發，可以透過 isManuallyClosed 得知是否需要重連。 */
    $close: {
        isManuallyClosed: boolean;
    };
};
declare type WebSocketParams<P extends Pub> = {
    /** 連線網址 */
    url: () => string | Promise<string>;
    /** 指定運行的 WebSocket 環境，假如你想應用在 NodeJs 上必須設定此參數 */
    system?: typeof WebSocket;
    /** 指定運行的 WebSocket Protocol */
    protocol?: string[];
    /** 接收到資料要執行什麼事 */
    onMessage: (_event: MessageEvent) => Promise<any>;
    /** 發送資料前進行資料轉換 */
    sendHandler: <K extends keyof P>(_channel: K, _data: P[K]) => Promise<any>;
};
/**
 * 具有重新連線與頻道模式的 WebSocket 模塊，你可以透過 onMessage 監聽伺服器方的訊息，並透過 event system 發送給其他監聽對象。
 */
export declare class WebSocketClient<P extends Pub, S> extends Event<S & Events> {
    _websocket?: WebSocket;
    private params;
    private isManuallyClosed;
    constructor(params: WebSocketParams<P>);
    private fail;
    private get connected();
    private createWebsocket;
    getStatus(): "wait" | "connecting" | "open" | "closeing" | "closed" | undefined;
    send<K extends keyof P>(channel: K, data: P[K]): Promise<void>;
    connect(): Promise<unknown>;
    disconnect(): void;
}
export {};
