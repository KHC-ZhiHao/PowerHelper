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
    $devWarn(functionName: string, data: any) {
        console.error(new Error(`PowerHelper (O_O) => ${functionName} -> ${parseError(data)}`))
    }

    $devError(functionName: string, data: any) {
        throw new Error(`PowerHelper (X_X) => ${functionName} -> ${parseError(data)}`)
    }
}
