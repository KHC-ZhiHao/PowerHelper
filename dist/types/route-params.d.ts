/**
 * 從路徑字串中獲取:開頭的變數
 */
declare type RemoveTail<S extends string, Tail extends string> = S extends `${infer P}${Tail}` ? P : S;
declare type GetRouteParameter<S extends string> = RemoveTail<RemoveTail<RemoveTail<S, `/${string}`>, `-${string}`>, `.${string}`>;
export declare type RouteParameters<Route extends string> = Route extends `${string}:${infer Rest}` ? (GetRouteParameter<Rest> extends never ? null : GetRouteParameter<Rest> extends `${infer ParamName}?` ? {
    [P in ParamName]?: string;
} : {
    [P in GetRouteParameter<Rest>]: string;
}) & (Rest extends `${GetRouteParameter<Rest>}${infer Next}` ? RouteParameters<Next> : unknown) : {};
export {};
