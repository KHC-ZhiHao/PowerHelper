
/**
 * 將陣列依照數量集成一組
 * @example
 * const myArray = [1,2,3,4,5,6]
 * const newArray = groups(3, myArray)
 * console.log(arrayGroups) // [[1,2,3],[4,5,6]]
 */

export const arrayGroups = <T>(size: number, data: T[]): T[][] => {
    let result: T[][] = []
    for (let i = 0; i < data.length; i += size) {
        result.push(data.slice(i, i + size))
    }
    return result
}
