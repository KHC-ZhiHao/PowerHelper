# Element

Dom 相關操作。

## 如何使用

```ts
import { element } from 'power-helper'
/**
 * 引入 JavaScript
 * @BrowserOnly
 */
element.importScript = function(url: string) => Promise<null>;

/**
 * 獲取視窗是否符合斷點資格
 * @BrowserOnly
 */

element.isBreakpoint = function(
    breakpoint: `${'xs' | 'sm' | 'md' | 'lg'}-${'only' | 'and-up' | 'and-down'}`,
    el: HTMLElement = window
) => boolean;
```
