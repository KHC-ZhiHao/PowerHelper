declare type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;
declare type GetRouteParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>, `.${string}`>;
/**
 * 從路徑字串中獲取:開頭的變數
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
declare type GetParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<RemoveTail<RemoveTail<S, `\n${string}`>, ` ${string}`>, `,${string}`>, `;${string}`>, `)${string}`>;
/**
 * 從 SQL 字串中獲取:開頭的變數
 * @example
 * const sql = `SELECT * FROM mytable WHERE name = :name AND card = :card;`
 * const data: RouteParameters<typeof sql> = {
 *  user: '123',
 *  card: '123'
 * }
 */
export declare type SqlParameters<Route extends string> = Route extends `${string}:${infer Rest}` ? {
    [P in GetParameter<Rest>]: string | number | string[] | number[] | null;
} & (Rest extends `${GetParameter<Rest>}${infer Next}` ? SqlParameters<Next> : unknown) : {};
export {};
