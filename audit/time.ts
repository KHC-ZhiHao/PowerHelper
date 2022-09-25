export const nowTime = () => Date.now()

export const minToMs = (min: number) => 1000 * 60 * min

export const getNowHours = () => {
    let date = new Date()
    return (date.getHours() + 8) % 24
}

class Time {

}
