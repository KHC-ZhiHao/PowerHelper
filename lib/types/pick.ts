export type PeelPath<
    N extends string,
    T extends Record<string, any>,
    K = keyof T
> = K extends string ? (
    T[K] extends Record<string, any> ?
    PeelPath<N extends '' ? K : `${N}.${K}`, T[K]> :
    N extends '' ? K : `${N}.${K}`
) | (N extends '' ? '' : N) : string

export type PeelType<
    P extends string,
    T extends Record<string, any>
> = P extends `${infer H}.${infer S}` ? PeelType<S, T[H]> : T[P]
