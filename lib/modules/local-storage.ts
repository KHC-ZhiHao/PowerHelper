import { Base } from '../module-base'

// LocalStorage Size 問題
// 檢驗資料正確的 function

type Intercept<K, T> = {
    Get: (name: K, data: T, status: Record<string, any>) => T | null
    Set: (name: K, data: T) => {
        data: T
        status: Record<string, any>
    }
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

    set<K extends keyof T>(name: K, data: T[K]) {
        if (this.storage) {
            let status = {}
            if (this.interceptSet) {
                let result = this.interceptSet(name as any, data as any)
                data = result.data as any
                status = result.status
            }
            this.storage.setItem(this._genName(name), JSON.stringify({
                data,
                status
            }))
        }
    }

    get<K extends keyof T>(name: K): T[K] | undefined {
        if (this.storage) {
            let data = this.storage.getItem(this._genName(name))
            if (data != null) {
                let result = JSON.parse(data)
                let response = result.data
                if (this.interceptGet) {
                    response = this.interceptGet(name as any, result.data, result.status)
                }
                return response
            }
        }
    }

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

    remove<K extends keyof T>(name: K) {
        if (this.storage) {
            this.storage.removeItem(this._genName(name))
        }
    }
}
