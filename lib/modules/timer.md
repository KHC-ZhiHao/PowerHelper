# Timer

一組計時器，可以正向也可以反向計時。

## 如何使用

```ts
import { Timer } from 'power-helper'
const timer = new Timer()
timer.play()
setTimeout(() => {
    console.log(timer.getTimeString()) // 00:03:00.00
}, 3 * 60 * 1000)
```

### Constructor

```ts
class Timer {
    constructor()
}
```

### Property

Extends: [Ticker](./Ticker.md)

```ts
/* 設定正向倒數或是反向 */
function setPositive(positive: boolean): Timer

/* 獲取現在執行時間(毫秒) */
function getTime(): number

/* 設定執行時間(毫秒) */
function setTime(ms: number): Timer

/* 增加執行時間(毫秒) */
function addTime(ms: number): Timer

/* 減少執行時間(毫秒) */
function subtractTime(ms: number): Timer

/* 獲取現在計時的小時 */
function getHours(): number

/* 獲取現在計時的分，每 60 一個循環 */
function getMinutes(): number

/* 獲取現在計時的秒，每 60 一個循環 */
function getSeconds(): number

/* 獲取現在計時的分，每 1000 一個循環 */
function getMicroseconds(): number

/* 獲取可以顯示用的時間字串 */
function getTimeString(format = 'hh:mm:ss.ff'): string
```
