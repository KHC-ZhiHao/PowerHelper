type QueryCollectionParams<T, R> = {
    /** 發出請求前蒐集資料的時間，單位: 毫秒 */
    waitTime: number
    /** 請求方法 */
    query: (_collection: T[]) => Promise<R[]>
}

/**
 * 可以蒐集資料並統一發出請求。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/query-collection.md
 */

export class QueryCollection<T, R> {
    private params: QueryCollectionParams<T, R>
    private timeout: ReturnType<typeof setTimeout> | null = null
    private collection: {
        data: T
        resolve: any
        reject: any
    }[] = []

    constructor(params: QueryCollectionParams<T, R>) {
        this.params = params
    }

    /** 推送一筆資料進搜集器 */
    push(data: T): Promise<R[]> {
        return new Promise((resolve, reject) => {
            this.collection.push({
                data,
                resolve,
                reject
            })
            if (this.timeout == null) {
                this.timeout = setTimeout(async() => {
                    let collection = this.collection.slice()
                    this.timeout = null
                    this.collection = []
                    try {
                        let result = await this.params.query(collection.map(e => e.data))
                        collection.forEach(e => e.resolve(result))
                    } catch (error) {
                        collection.forEach(e => e.reject(error))
                    }
                }, this.params.waitTime)
            }
        })
    }
}
