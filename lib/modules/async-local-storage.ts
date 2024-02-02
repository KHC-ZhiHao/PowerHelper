type Intercept = {
    Set: (_name: string, _data: any) => Promise<any>
    Get: (_name: string, _data: any, _context: {
        /** Storage */
        storage: AsyncLocalStorage<any>
        /** 是否是採用預設值 */
        isDefault: boolean
        /** 獲取預設值 */
        defaultValue: () => Promise<any>
    }) => Promise<any>
}

type CusStorage = {
    keys: () => Promise<string[]>
    getItem(key: string): Promise<string | null>
    setItem(key: string, value: string): Promise<void>
    removeItem(key: string): Promise<void>
}

/**
 * 非同步的操作 LocalStorage，有助於擴展更多應用模式。
 * @see https://github.com/KHC-ZhiHao/PowerHelper/blob/master/lib/modules/async-local-storage.md
 */

export class AsyncLocalStorage<T extends Record<string, any>> {
    private options?: {
        storageSystem: CusStorage
        defaultColumns?: Partial<{
            [K in keyof T]: () => Promise<T[K]>
        }>
        intercept?: {
            get?: Intercept['Get']
            set?: Intercept['Set']
        }
    }
    private storage: CusStorage
    private namespaces: string
    private interceptGet: Intercept['Get'] | null = null
    private interceptSet: Intercept['Set'] | null = null
    constructor(namespaces: string, options: {
        /** 指定運行的 LocalStorage 環境，假如你想應用在其他不同的系統上必須設定此參數 */
        storageSystem: CusStorage
        /** 假如該欄位尚未寫入時給予預設值 */
        defaultColumns?: Partial<{
            [K in keyof T]: () => Promise<T[K]>
        }>
        /** 攔截相關 get set 設定 */
        intercept?: {
            /** 攔截資料獲取 */
            get?: Intercept['Get']
            /** 攔截資料設定 */
            set?: Intercept['Set']
        }
    }) {
        this.options = options
        this.storage = options.storageSystem
        this.namespaces = namespaces
        if (options) {
            if (options.storageSystem) {
                this.storage = options.storageSystem
            }
            if (options.intercept) {
                if (options.intercept.get) {
                    this.interceptGet = options.intercept.get.bind(this)
                }
                if (options.intercept.set) {
                    this.interceptSet = options.intercept.set.bind(this)
                }
            }
        }
    }

    static storageToAsyncStorage(storage: Storage): CusStorage {
        return {
            keys: async() => Object.keys(storage),
            getItem: async(key: string) => storage.getItem(key),
            setItem: async(key: string, value: string) => storage.setItem(key, value),
            removeItem: async(key: string) => storage.removeItem(key)
        }
    }

    /** 獲得名稱完整的鍵值 */

    toKey(name: string | number | symbol) {
        return `_power_a_${this.namespaces}/${name.toString()}`
    }

    /** 設定指定名稱的資料 */

    async set<K extends keyof T>(name: K, data: T[K] | ((_value: T[K]) => Promise<T[K]>)) {
        let saveData = typeof data !== 'function' ? data : null
        if (typeof data === 'function') {
            const originData = await this.get(name)
            saveData = await (data as (value: T[K]) => Promise<T[K]>)(originData)
        }
        if (this.interceptSet) {
            saveData = await this.interceptSet(name as any, saveData as any)
        }
        await this.storage.setItem(this.toKey(name), JSON.stringify(saveData))
    }

    /** 獲取指定名稱的資料 */

    async get<K extends keyof T>(name: K): Promise<T[K]> {
        let result: any = null
        let options = this.options
        let isDefault = false
        let defaultValue = async() => null
        if (options && options.defaultColumns && options.defaultColumns[name]) {
            defaultValue = options.defaultColumns[name] as any
        }
        let data = await this.storage.getItem(this.toKey(name))
        if (data == null) {
            data = await defaultValue()
            isDefault = true
        }
        result = isDefault ? data : (data != null ? JSON.parse(data) : null)
        if (this.interceptGet) {
            result = await this.interceptGet(name as any, result, {
                storage: this,
                isDefault,
                defaultValue
            })
        }
        return result
    }

    /** 刪除整個 namespaces 的資料 */

    async clear() {
        let name = `_power_a_${this.namespaces}/`
        let items = await this.storage.keys()
        for (let key of items) {
            if (key.length >= name.length && key.slice(0, name.length) === name) {
                await this.remove(key.slice(name.length))
            }
        }
    }

    /** 刪除指定名稱的資料 */

    async remove<K extends keyof T>(name: K) {
        await this.storage.removeItem(this.toKey(name))
    }
}
