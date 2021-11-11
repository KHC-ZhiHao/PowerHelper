import { SqlParameters, RouteParameters } from './string-params'

() => {
    const route = `users/:user/cards/:card`
    const data: RouteParameters<typeof route> = {
        card: '123',
        user: '456'
    }
    return data
}

() => {
    const sql = `
        SELECT *
        FROM mydb
        WHERE name = :name;
    `
    const data: SqlParameters<typeof sql> = {
        name: 'name'
    }
    return data
}
