import { Base } from '../module-base'

type Intercept<K, T> = {
    Get: (name: K, data: T) => T | null
    Set: (name: K, data: T) => T
}

export class LocalStorage<
    T extends Record<string, any>,
    K extends keyof T = keyof T
> extends Base {
    private storage: Storage | null
    private namespaces: string
    private interceptGet: Intercept<K, T[K]>['Get'] | null = null
    private interceptSet: Intercept<K, T[K]>['Set'] | null = null
    constructor(namespaces: string, options?: {
        storageSystem?: Storage
        dafaultColumns?: Partial<T>
        intercept?: {
            get?: Intercept<K, T[K]>['Get']
            set?: Intercept<K, T[K]>['Set']
        }
    }) {
        super('LocalStorage')
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
            if (options.dafaultColumns) {
                for (let key in options.dafaultColumns) {
                    if (this.get(key) == null) {
                        this.set(key, options.dafaultColumns[key] as any)
                    }
                }
            }
        }
    }

    private _genName(name: string | number | symbol) {
        return `_power_${this.namespaces}/${name.toString()}`
    }

    /** 設定指定名稱的資料 */

    set<K extends keyof T>(name: K, data: T[K]) {
        if (this.storage) {
            if (this.interceptSet) {
                let result = this.interceptSet(name as any, data as any)
                data = result as any
            }
            this.storage.setItem(this._genName(name), JSON.stringify(data))
        }
    }

    /** 獲取指定名稱的資料 */

    get<K extends keyof T>(name: K): T[K] | undefined {
        if (this.storage) {
            let data = this.storage.getItem(this._genName(name))
            if (data != null) {
                let result = JSON.parse(data)
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
