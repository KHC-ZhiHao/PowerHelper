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
