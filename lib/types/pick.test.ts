import { PickByTypeStrict, PromiseResponseType, PromiseType } from './pick.js'

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

() => {
    const foo = Promise.resolve(3)
    const bar: PromiseType<typeof foo> = 1
    return bar
}
