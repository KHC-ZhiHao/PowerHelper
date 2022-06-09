import { DeepReadonly } from './record'

() => {
    const deepReadonly = <T>(data: T) => data as DeepReadonly<T>
    const data = deepReadonly({
        card: '123',
        user: {
            name: '123'
        }
    })
    return data
}
