# String Params

解析複雜的字串找出變數。

## 如何使用

```ts
import {
    /**
     * 只有空白的字串組，不包含空字串
     * @example
     * const text: Whitespace = ' '
     */
    Whitespace,
    /**
     * 移除前後的空白字組
     * @example
     * const text: Trim<' 123 '> = '123'
     */
    Trim,
    /**
     * 從字串中獲取指定符號包覆的變數
     * @example
     * const text: VarParameters<'{', '}', '我的名子是{name}'> = {
     *  name: 'dave'
     * }
     */
    VarParameters,
    /**
     * 從路徑字串中獲取 : 開頭的變數
     * @example
     * const route = 'users/:user/cards/:card'
     * const data: RouteParameters<typeof route> = {
     *  user: '123',
     *  card: '123'
     * }
     */
    RouteParameters,
    /**
     * 從 SQL 字串中獲取 : 開頭的變數
     * @example
     * const sql = `SELECT * FROM mytable WHERE name = :name AND card = :card;`
     * const data: SqlParameters<typeof sql> = {
     *  user: '123',
     *  card: '123'
     * }
     */
    SqlParameters
} from 'power-helper/types/string-params'
```
