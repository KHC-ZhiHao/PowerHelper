const parseError = (data: any) => {
    if (typeof data === 'string') {
        return data
    }
    if (data instanceof Error) {
        return data.message
    }
    if (typeof data === 'object') {
        try {
            let message = JSON.stringify(data, null, 4)
            return message
        } catch (error) {
            return 'Unknown Error'
        }
    }
    return 'Unknown Error'
}

export class Base {
    private _base: { name: string }
    constructor(name: string) {
        this._base = {
            name
        }
    }

    $devWarn(functionName: string, data: any) {
        console.error(new Error(`PowerHelper (O_O) ${this._base.name} => ${functionName} -> ${parseError(data)}`))
    }

    $devError(functionName: string, data: any) {
        throw new Error(`PowerHelper (X_X) ${this._base.name} => ${functionName} -> ${parseError(data)}`)
    }
}
