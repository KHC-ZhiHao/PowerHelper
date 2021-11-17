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
```
