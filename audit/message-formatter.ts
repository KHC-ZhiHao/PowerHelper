export const fShortId = (content: string) => {
    return `$sid{${content}}`
}

export const fTask = (type: string) => {
    return `$task{${type}}`
}

export const hideName = (name: string) => {
    return name.length <= 1 ? `${name}*` : `${name[0]}${'*'.repeat(name.length - 1)}`
}
