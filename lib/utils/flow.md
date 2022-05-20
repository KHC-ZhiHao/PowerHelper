# Flow

流程控制的工具。

## 如何使用

```ts
import { flow } from 'power-helper'
/** 停止執行指定時間(毫秒) */
flow.sleep = function(ms: number): Promise<null>;

/** 隨機獲取陣列內的一個值 */
flow.randomPick = function(items: any[]): any;

/** 求整數範圍內的隨機值 */
flow.randomInt = function(min: number, max: number): number;

/** 非同步迴圈 */
flow.asyncWhile = function(cb: (context: {
    /** 迴圈執行的次數 */
    count: number
    /** 跳出迴圈 */
    doBreak: () => void
}) => void): void;

/** 重複執行直到成功為止 */
flow.retry = function(params: {
    /**
     * 最大重複次數
     * @default 1
     */
    max?: number
    /** 錯誤時呼叫此事件 */
    onFail?: (index: number, error: any) => void
    /**
     * 每次錯誤重試間格的等待時間(毫秒)
     * @default 0
     */
    interval?: number
    /** 總執行過程，回傳 resolve 為成功， reject 為失敗進入下一次重試 */
    action: (index: number) => Promise<any>
}): Promise<any>;
```
