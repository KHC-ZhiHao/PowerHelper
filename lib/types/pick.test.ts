import { PickByTypeStrict } from './pick'

() => {
    const data = {
        name: 'dave',
        age: 1
    }
    const after: PickByTypeStrict<number, typeof data> = {
        age: 1
    }
    return after
}
