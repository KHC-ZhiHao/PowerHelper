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
