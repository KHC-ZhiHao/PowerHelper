type Intercept = {
    Set: (_name: string, _data: any) => any
    Get: (_name: string, _data: any, _context: {
        /** Storage */
        storage: LocalStorage<any>
        /** 是否是採用預設值 */
        isDefault: boolean
        /** 獲取預設值 */
        defaultValue: () => any
    }) => any
}

type CusStorage = {
    readonly length: number
    keys?: () => string[]
    getItem(key: string): string | null
    setItem(key: string, value: string): void
    removeItem(key: string): void
}

export class LocalStorage<T extends Record<string, any>> {
    private options?: {
        storageSystem?: CusStorage
        defaultColumns?: Partial<{ [K in keyof T]: () => T[K] }>
        intercept?: {
            get?: Intercept['Get']
            set?: Intercept['Set']
        }
    }
    private storage: CusStorage
    private namespaces: string
    private interceptGet: Intercept['Get'] | null = null
    private interceptSet: Intercept['Set'] | null = null
    constructor(namespaces: string, options?: {
        /** 指定運行的 LocalStorage 環境，假如你想應用在 SessionStorage 上必須設定此參數 */
        storageSystem?: CusStorage
        /** 假如該欄位尚未寫入時給予預設值 */
        defaultColumns?: Partial<{ [K in keyof T]: () => T[K] }>
        /** 攔截相關 get set 設定 */
        intercept?: {
            /** 攔截資料獲取 */
            get?: Intercept['Get']
            /** 攔截資料設定 */
            set?: Intercept['Set']
        }
    }) {
        this.options = options
        this.storage = (typeof window === 'undefined' ? null : window.localStorage)!
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

    private _genName(name: string | number | symbol) {
        return `_power_${this.namespaces}/${name.toString()}`
    }

    /** 設定指定名稱的資料 */

    set<K extends keyof T>(name: K, data: T[K] | ((_value: T[K]) => T[K])) {
        let saveData = typeof data === 'function' ? (data as any)(this.get(name)) : data
        if (this.interceptSet) {
            saveData = this.interceptSet(name as any, saveData as any)
        }
        this.storage.setItem(this._genName(name), JSON.stringify(saveData))
    }

    /** 獲取指定名稱的資料 */

    get<K extends keyof T>(name: K): T[K] {
        let result = null
        let options = this.options
        let isDefault = false
        let defaultValue = () => null
        if (options && options.defaultColumns && options.defaultColumns[name]) {
            defaultValue = options.defaultColumns[name] as any
        }
        let data = this.storage.getItem(this._genName(name))
        if (data == null) {
            data = defaultValue()
            isDefault = true
        }
        result = isDefault ? data : (data != null ? JSON.parse(data) : null)
        if (this.interceptGet) {
            result = this.interceptGet(name as any, result, {
                storage: this,
                isDefault,
                defaultValue
            })
        }
        return result
    }

    /** 刪除整個 namespaces 的資料 */

    clear() {
        let name = `_power_${this.namespaces}/`
        let items = this.storage.keys ? this.storage.keys() : Object.keys(this.storage)
        for (let key of items) {
            if (key.length >= name.length && key.slice(0, name.length) === name) {
                this.remove(key.slice(name.length))
            }
        }
    }

    /** 刪除指定名稱的資料 */

    remove<K extends keyof T>(name: K) {
        this.storage.removeItem(this._genName(name))
    }
}
