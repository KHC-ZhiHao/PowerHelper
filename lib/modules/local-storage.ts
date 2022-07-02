import { Base } from '../module-base'

type Intercept<K, T> = {
    Get: (name: K, data: T) => T | null
    Set: (name: K, data: T) => T
}

export class LocalStorage<
    T extends Record<string, any>,
    K extends keyof T = keyof T
> extends Base {
    private options?: {
        storageSystem?: Storage
        defaultColumns?: Partial<{ [K in keyof T]: () => T[K] }>
        intercept?: {
            get?: Intercept<K, T[K]>['Get']
            set?: Intercept<K, T[K]>['Set']
        }
    }
    private storage: Storage | null
    private namespaces: string
    private interceptGet: Intercept<K, T[K]>['Get'] | null = null
    private interceptSet: Intercept<K, T[K]>['Set'] | null = null
    constructor(namespaces: string, options?: {
        /** 指定運行的 LocalStorage 環境，假如你想應用在 NodeJs 上必須設定此參數 */
        storageSystem?: Storage
        /** 假如該欄位尚未寫入時給予預設值 */
        defaultColumns?: Partial<{ [K in keyof T]: () => T[K] }>
        /** 攔截相關 get set 設定 */
        intercept?: {
            /** 攔截資料獲取 */
            get?: Intercept<K, T[K]>['Get']
            /** 攔截資料設定 */
            set?: Intercept<K, T[K]>['Set']
        }
    }) {
        super()
        this.options = options
        this.storage = typeof window === 'undefined' ? null : window.localStorage
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

    set<K extends keyof T>(name: K, data: T[K] | ((value: T[K]) => T[K])) {
        if (this.storage) {
            let saveData = typeof data === 'function' ? (data as any)(this.get(name)) : data
            if (this.interceptSet) {
                saveData = this.interceptSet(name as any, saveData as any)
            }
            this.storage.setItem(this._genName(name), JSON.stringify(saveData))
        }
    }

    /** 獲取指定名稱的資料 */

    get<K extends keyof T>(name: K): T[K] | undefined {
        if (this.storage) {
            let isDefault = false
            let data = this.storage.getItem(this._genName(name))
            if (data == null) {
                let options = this.options
                if (options && options.defaultColumns && options.defaultColumns[name]) {
                    data = (options.defaultColumns[name] as any)()
                    isDefault = true
                }
            }
            if (data != null) {
                let result = isDefault ? data : JSON.parse(data)
                if (this.interceptGet) {
                    result = this.interceptGet(name as any, result)
                }
                return result
            }
        }
    }

    /** 刪除整個 namespaces 的資料 */

    clear() {
        if (this.storage) {
            let name = `_power_${this.namespaces}/`
            let items = Object.keys(this.storage)
            for (let key of items) {
                if (key.length >= name.length && key.slice(0, name.length) === name) {
                    this.remove(key.slice(name.length))
                }
            }
        }
    }

    /** 刪除指定名稱的資料 */

    remove<K extends keyof T>(name: K) {
        if (this.storage) {
            this.storage.removeItem(this._genName(name))
        }
    }
}
