export const devError = (functionName: string, message: string) => {
    throw new Error(`PowerHelper (X_X) => ${functionName} -> ${message}`)
}
