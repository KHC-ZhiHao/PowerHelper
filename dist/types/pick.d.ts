export declare type PeelPath<N extends string, T extends Record<string, any>, K = keyof T> = K extends string ? (T[K] extends Record<string, any> ? PeelPath<N extends '' ? K : `${N}.${K}`, T[K]> : N extends '' ? K : `${N}.${K}`) | (N extends '' ? '' : N) : string;
export declare type PeelType<P extends string, T extends Record<string, any>> = P extends `${infer H}.${infer S}` ? PeelType<S, T[H]> : T[P];
export declare type PromiseResponseType<T extends (...args: any) => Promise<any>, R = Parameters<ReturnType<T>['then']>[0]> = R extends (value: infer P) => any ? P : never;
