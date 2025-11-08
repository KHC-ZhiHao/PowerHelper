import { DeepReadonly, Assign } from './record.js'

() => {
    const deepReadonly = <T>(data: T) => data as DeepReadonly<T>
    const data = deepReadonly({
        card: '123',
        user: {
            name: '123'
        }
    })
    const assign: Assign<{ name: number }, { name: string }> = Object.assign({ name: 1 }, { name: '1' })
    return {
        data,
        assign
    }
}
