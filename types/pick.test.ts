import { PickByTypeStrict, PromiseResponseType } from './pick'

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

() => {
    const foo = async() => 3
    const bar: PromiseResponseType<typeof foo> = 1
    return bar
}
