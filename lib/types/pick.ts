type KeysOfTypeStrict<T, U> = {
    [P in keyof T]: T[P] extends U ? (U extends T[P] ? P : never) : never
}[keyof T]

/**
 * 在 Record 中獲取指定類型的參數
 * @example
 * const user = {
 *  name: 'dave',
 *  age: 18
 * }
 * const onlyAge: PickByTypeStrict<number, typeof user> = {
 *  age: 20
 * }
 */

export type PickByTypeStrict<U, T> = Pick<T, KeysOfTypeStrict<T, U>>

/**
 * 獲取 Promise 的回傳值
 * @example
 * const foo = async() => {
 *  return 3
 * }
 * const bar: PromiseResponseType<typeof foo> = 3
 */

export type PromiseResponseType<
    T extends (...args: any) => Promise<any>,
    R = Parameters<ReturnType<T>['then']>[0]
> =  R extends (value: infer P) => any ? P : never

/**
 * 獲取 Promise 成功的值
 * @example
 * const foo = Promise.resolve(3)
 * const bar: PromiseType<typeof foo> = 3
 */

export type PromiseType<T extends Promise<any>> = T extends Promise<infer P> ? P : never

/**
 * 回傳物件鏈
 * @example
 * const foo = {
 *  a: {
 *      b: '123'
 *  }
 * }
 * const bar: ObjectPath<typeof foo> = 'a.b'
 */

export type ObjectPath<
    T extends Record<string, any>,
    N extends string = '',
    K = keyof T
> = K extends string ? (
    T[K] extends Record<string, any> ?
    ObjectPath<T[K], N extends '' ? K : `${N}.${K}`> :
    N extends '' ? K : `${N}.${K}`
) | (N extends '' ? '' : N) : string

/**
 * 深度解析鏈上的型態
 * @example
 * const foo = {
 *  a: {
 *      b: '123'
 *  }
 * }
 * const bar: PeelType<'a.b', typeof foo> = '123'
 */

export type PeelType<
    P extends string,
    T extends Record<string, any>
> = P extends `${infer H}.${infer S}` ? PeelType<S, T[H]> : T[P]
