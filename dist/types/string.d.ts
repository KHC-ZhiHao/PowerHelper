declare type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;
declare type Spaces = "      " | "     " | "    " | "   " | "  " | " ";
/**
 * 只有空白的字串組，不包含空字串
 * @example
 * const text: Whitespace = ' '
 */
export declare type Whitespace = Spaces | "\n" | "\t";
declare type TrimStart<T extends string> = T extends `${Whitespace}${infer Rest}` ? TrimStart<Rest> : T;
declare type TrimEnd<T extends string> = T extends `${infer Rest}${Whitespace}` ? TrimEnd<Rest> : T;
/**
 * 移除前後的空白字組
 * @example
 * const text: Trim<' 123 '> = '123'
 */
export declare type Trim<T extends string> = TrimEnd<TrimStart<T>>;
declare type GetRouteParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>, `.${string}`>;
/**
 * 從路徑字串中獲取 : 開頭的變數
 * @example
 * const route = 'users/:user/cards/:card'
 * const data: RouteParameters<typeof route> = {
 *  user: '123',
 *  card: '123'
 * }
 */
export declare type RouteParameters<Route extends string> = Route extends `${string}:${infer Rest}` ? (GetRouteParameter<Rest> extends never ? null : GetRouteParameter<Rest> extends `${infer ParamName}?` ? {
    [P in ParamName]?: string;
} : {
    [P in GetRouteParameter<Rest>]: string;
}) & (Rest extends `${GetRouteParameter<Rest>}${infer Next}` ? RouteParameters<Next> : unknown) : {};
declare type GetSqlParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<RemoveTail<RemoveTail<S, `\n${string}`>, ` ${string}`>, `,${string}`>, `;${string}`>, `)${string}`>;
/**
 * 從 SQL 字串中獲取 : 開頭的變數
 * @example
 * const sql = `SELECT * FROM mytable WHERE name = :name AND card = :card;`
 * const data: SqlParameters<typeof sql> = {
 *  user: '123',
 *  card: '123'
 * }
 */
export declare type SqlParameters<Sql extends string> = Sql extends `${string}:${infer Rest}` ? {
    [P in GetSqlParameter<Rest>]: string | number | string[] | number[] | null;
} & (Rest extends `${GetSqlParameter<Rest>}${infer Next}` ? SqlParameters<Next> : unknown) : {};
declare type GetVarParameter<S extends string, E extends string> = RemoveTail<S, `${E}${string}`>;
/**
 * 從字串中獲取指定符號包覆的變數
 * @example
 * const text: VarParameters<'{', '}', '我的名子是{name}'> = {
 *  name: 'dave'
 * }
 */
export declare type VarParameters<F extends string, E extends string, T extends string> = T extends `${string}${F}${infer Rest}` ? {
    [P in Trim<GetVarParameter<Rest, E>>]: string | number;
} & (Rest extends `${GetVarParameter<Rest, E>}${infer Next}` ? VarParameters<F, E, Next> : unknown) : {};
export {};
